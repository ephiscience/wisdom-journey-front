import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-game-status',
  template: `
      <app-criterion-points [numCriterions]=game.validatedCriterions.length></app-criterion-points>
      <app-timer (additionalCriteria)="removeAdditionalCriterion()"
                 (nextQuestion)="displayNextQuestion()"
                 (shuffleRoles)="emitShuffleRoles()"
                 (checkVictory)="checkVictory()">
      </app-timer>
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
  @Output() shuffleRoless = new EventEmitter();
  @Output() reloadGame = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removeAdditionalCriterion(): void {
    if (this.game.remainingCriterions == null) {
      return;
    } else {
      const removedCriterionText = this.game.remainingCriterions[this.game.remainingCriterions.length - 1].text;
      this.game.remainingCriterions.splice(-1, 1);
      this.game.validatedCriterions.push({text: removedCriterionText});
    }
  }

  displayNextQuestion(): void {
    if (this.game == null) {
      return;
    } else {
      this.game.remainingQuestions.shift();
    }
  }

  emitShuffleRoles(): void {
    this.shuffleRoless.emit();
  }

  checkVictory(): void{
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
}
