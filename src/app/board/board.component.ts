import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.component';

export interface Question {
  text: string
}

export interface Criterion {
  text: string
}

const questions = [
  { text: "Quel temps fait-il aujourd'hui?" },
  { text: "Comment vas-tu?" },
  { text: "C'est bien Angular?" },
  { text: "Blabla" }
]

function randomQuestion(): Question {
  const index = Math.floor(Math.random() * questions.length)

  return questions[index]
}

@Component({
  selector: 'app-board',
  template: `
    <div>
      board works!
      <div>
        <app-question [question]="displayedQuestion" ></app-question>
        <button (click)="loadQuestion()">Next</button>

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

/* `
    <div>
      board works!
      <button (click)="loadQuestion()">Nouvelle question</button>
      <div>
        <app-question [question]="displayedQuestion" [reversed]="true"></app-question>

        <div *ngIf="displayedCriterions.length; else noCriterion">
          <app-criterion-card *ngFor="let c of displayedCriterions" [criterion]="c" (validated)="onCriterionValidated(c)"></app-criterion-card>
        </div>
        <ng-template #noCriterion>Tous les critères ont été validés, bravo!</ng-template>

        <app-question [question]="displayedQuestion"></app-question>
      </div>
    </div>
  `
  */ 
export class BoardComponent implements OnInit {
  displayedQuestion: Question | null = null

  @Input() game: Game | null = null;

  constructor() { }

  ngOnInit(): void {
  }
 
  //removes criterion from game.remainingCriterion and adds criterion to game.validatedCriterion
  // What should I do with the error ? 
  onCriterionValidated(c: Criterion) {
    this.game.remainingCriterions = this.game.remainingCriterions.filter(

      e => e.text != c.text
    );
    this.game.validatedCriterions.push(c);
  }

  loadQuestion(){
    setTimeout(() => {
      this.displayedQuestion = randomQuestion()
    }, 1000)
  }
}
