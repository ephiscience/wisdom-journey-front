import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-game-status',
  template: `
    <div>
      <app-criterion-points [NumCriterions]=game.validatedCriterions.length></app-criterion-points>
      <app-timer> Timer </app-timer> 
      <app-question-points [NumQuestions]=game.remainingQuestions.length></app-question-points>
    </div>
  `,
  styles: [
  ]
})
export class GameStatusComponent implements OnInit {
  @Input() game: Game | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
