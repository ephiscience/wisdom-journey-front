import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-game-status',
  template: `
    <p>
      <app-criterion-points [NumCriterions]=game.remainingCriterions.length></app-criterion-points>
    </p>
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
