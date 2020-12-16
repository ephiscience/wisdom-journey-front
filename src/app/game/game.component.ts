import { Component, Input, OnInit } from '@angular/core';
import { Criterion, Question } from '../board/board.component';

export interface Player {
  name: string
}

export interface Game {
  players: Player[],
  remainingCriterions: Criterion[],
  remainingQuestions: Question[],
  validatedCriterions: Criterion[],
}

// TODO: build an exmaple game here
// const EXAMPLE_GAME = {
//   players: [{name: "moi"}],
//   remainingQuestions: []
// }

@Component({
  selector: 'app-game',
  template: `
    <!-- Add status bar -->
    <app-board></app-board> <!-- app-board will need: question + criterions to display -->
    <!-- Add players -->
  `,
  styles: [
    `
      .example {
        color: red;
      }
    `
  ]
})
export class GameComponent implements OnInit {
  @Input() game: Game | null = null

  constructor() { }

  ngOnInit(): void {
  }
}
