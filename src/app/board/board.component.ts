import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../game/game.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { delay } from 'rxjs/operators';

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
        [@fade]="this.status"
        (@fade.done)="onAnimationEvent($event)"
        *ngFor="let c of threeCriterions; index as i"
        [criterion]="c"
        [endOfTurn]="this.endOfTurn"
        (validated)="validateCriterion(c, i); emitCheckGameState()"
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
  animations: [
    trigger('fade', [
      state(
        'normal',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      state(
        'new',
        style({
          opacity: 0,
          transform: 'translateY(-110%)',
        })
      ),
      transition('new => normal', [animate(1000)]),
      transition('normal => new', [animate(1000)]),
    ]),
  ],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() game!: Game;
  @Input() endOfTurn!: boolean;
  @Output() checkGameState = new EventEmitter();
  threeCriterions!: Criterion[];
  status = 'normal';

  constructor() {}

  ngOnInit(): void {
    console.log(this.game.remainingCriterions);
    this.threeCriterions = this.game.remainingCriterions.slice(0, 3); // initialize when playing a new game !
  }

  ngOnChanges(): void {
    this.threeCriterions = this.game.remainingCriterions.slice(0, 3);
  }

  async validateCriterion(c: Criterion, i: number): Promise<void> {
    await delay(500);
    this.status = 'new';
    this.game.removeCriterion(c, i);
    this.threeCriterions.splice(i, 1);
    if (this.game.remainingCriterions[2]) {
      this.threeCriterions.splice(i, 0, this.game.remainingCriterions[2]);
    }
    // remove validated criterion from
    //this.status = 'normal';
  }

  emitCheckGameState(): void {
    this.checkGameState.emit();
  }

  onAnimationEvent(event: AnimationEvent) {
    console.log(event);
    console.log('anim done ?');
    this.status = 'normal';
  }
}
