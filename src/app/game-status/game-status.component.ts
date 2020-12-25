import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Criterion } from '../board/board.component';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-game-status',
  template: `
    <div>
      <app-criterion-points [numCriterions]=game.validatedCriterions.length></app-criterion-points>
      <app-timer (additionalCriteria)="removeAdditionalCriterion()" (nextQuestion)="displayNextQuestion()" (shuffleRoles)="emitShuffleRoles()"></app-timer>
      <app-question-points [numQuestions]=game.remainingQuestions.length></app-question-points>
    </div>
  `,
  styles: [
  ]
})
export class GameStatusComponent implements OnInit {
  @Input() game!: Game ;
  @Output() shuffleRoless = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeAdditionalCriterion(): void {
    if ( this.game.remainingCriterions == null ) {
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

}
