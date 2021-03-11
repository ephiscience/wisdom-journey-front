import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../game/game.model';

export interface Question {
  text: string;
}

export interface Criterion {
  text: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-board',
  template: `
    <div class="question">
      <app-question [question]="game.remainingQuestions[0]" (next)="game.removeQuestion(); emitCheckGameState()"></app-question>
    </div>

    <div class="criterions" *ngIf="game.remainingCriterions.length; else noCriterion">
      <app-criterion-card
        *ngFor="let c of game.remainingCriterions.slice(0, 3); index as i"
        [criterion]="c"
        (validated)="game.removeCriterion(c, i); emitCheckGameState()"
      >
        {{ c.text }}
      </app-criterion-card>
    </div>
    <ng-template #noCriterion></ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      div.question {
        flex-basis: 130px;
        margin-bottom: 50px;
      }

      div.criterions {
        flex-basis: 162;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      app-criterion-card {
        flex-basis: 162px;
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  @Input() game!: Game;
  @Output() checkGameState = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitCheckGameState(): void {
    this.checkGameState.emit();
  }
}
