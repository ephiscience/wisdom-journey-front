import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../game/game.component';

export interface Question {
  text: string;
}

export interface Criterion {
  text: string;
}


@Component({
  selector: 'app-board',
  template: `
        <div class="question" *ngIf="game.remainingQuestions.length; else noQuestion">
          <app-question [question]="game.remainingQuestions[0]" (click)="loadQuestion()"></app-question>
        </div>
        <ng-template #noQuestion>Il n'y a plus de Questions</ng-template>
      

        <div class="criterions" *ngIf="game.remainingCriterions.length; else noCriterion">
          <app-criterion-card
            *ngFor="let c of game.remainingCriterions.slice(0, 3);index as i"
            [criterion]="c"
            (validated)="onCriterionValidated(c, i)">
          </app-criterion-card>
        </div>
        <ng-template #noCriterion>Tous les critères ont été validés, bravo!</ng-template>
  `,
  styles: [`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
  }
  
  div.question {
    flex-basis: 130px ;
    margin-bottom:50px;
  }

  div.criterions {
    flex-basis: 162;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
  }
  app-criterion-card{
    flex-basis: 162px;
  }

    `]
})

export class BoardComponent implements OnInit{
  @Input() game!: Game;
  @Output() reloadGame = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  checkVictory(): void {
    console.log('check victory conditions');
    if (this.game.remainingQuestions.length === 1 && this.game.remainingCriterions.length > 0){
      const answer = confirm('DEFEAT! \n Do you want to play again ?');
      if (answer === true){
        this.reloadGame.emit();
      } else {
        console.log('return to menu');
      }
    }
    else if (this.game.remainingQuestions.length > 0 && this.game.remainingCriterions.length === 0){
      const answer = confirm('VICTORY ! \n Do you want to play again ?');
      if (answer === true){
        this.reloadGame.emit();
      } else {
        console.log('return to menu');
      }
    }
  }

  // removes criterion from game.remainingCriterion and adds criterion to game.validatedCriterion
  onCriterionValidated(c: Criterion, i: number): void {
    if (this.game == null) {
      return;
    } else {
      this.game.validatedCriterions.push(c);
      this.game.remainingCriterions.splice(i, 1);
    }
    this.checkVictory();
  }

  loadQuestion(): void {
    this.checkVictory();
      if (this.game == null) {
        return;
      } else {
        this.game.remainingQuestions.shift();
      }
  }
}
