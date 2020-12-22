import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.component';

export interface Question {
  text: string
}

export interface Criterion {
  text: string
}


@Component({
  selector: 'app-board',
  template: `
    <div>
      <div>
      <div *ngIf="game.remainingQuestions.length; else noQuestion">
        <app-question [question]=game.remainingQuestions[0] ></app-question>
        <button (click)="loadQuestion()">Next</button>
        </div>
        <ng-template #noQuestion>Il n'y a plus de Questions</ng-template>

        <div *ngIf="game.remainingCriterions.length; else noCriterion">
          <app-criterion-card *ngFor="let c of game.remainingCriterions.slice(0, 3)" [criterion]="c" (validated)="onCriterionValidated(c)"></app-criterion-card>
        </div>
        <ng-template #noCriterion>Tous les critères ont été validés, bravo!</ng-template>
      </div>
    </div>
  `,
  styles: [
  ]
})

export class BoardComponent implements OnInit {

  @Input() game: Game | null = null;

  constructor() { }

  ngOnInit(): void {
  }
 
  //removes criterion from game.remainingCriterion and adds criterion to game.validatedCriterion
  // What should I do with the error ? 
  onCriterionValidated(c: Criterion) {
    if (this.game ==null) return;
    this.game.remainingCriterions = this.game.remainingCriterions.filter(

      e => e.text != c.text
    );
    this.game.validatedCriterions.push(c);
  }

  loadQuestion(){
    setTimeout(() => {
      if (this.game ==null) return;
      else {
      let removedQuestion = this.game.remainingQuestions.shift()}
    }, 1000)
  }
}
