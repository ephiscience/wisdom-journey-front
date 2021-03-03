import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-game-status',
  template: `
      <app-criterion-points [numCriterions]=game.validatedCriterions.length></app-criterion-points>
      <app-timer (endTimer)="emitEndOfGameTurn()" [endOfGame]=this.reloadTimer [modalActive]=this.pauseTimer></app-timer>
      <app-question-points [game]=game></app-question-points>
  `,
  styles: [`
   :host {
    background: #404040 0% 0% no-repeat padding-box;
    box-shadow: 3px 6px 6px #0000005A;
    opacity: 1;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
   }

   app-criterion-points{
    flex-basis: 275px ;
   }

   timer {
    flex-basis: 100px ;
   }

   app-question-points{
    flex-basis: 333px ;
   }
  `]
})
export class GameStatusComponent implements OnInit {
  @Input() game!: Game;
  @Input() pauseTimer!: boolean;
  @Output() endOfGameTurn = new EventEmitter();
  @Input() reloadTimer!: boolean;

  constructor() {}

  ngOnInit(): void {}

  emitEndOfGameTurn(): void {
    this.endOfGameTurn.emit();
  }

}
