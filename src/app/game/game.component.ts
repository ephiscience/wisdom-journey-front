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
 const EXAMPLE_GAME: Game = {
   players: [{name: "player 1"}, {name: "player 2"}, {name: "player 3"}, {name: "player 4"}],
   remainingCriterions: [{"text": "criterion1"}, {"text": "criterion2"}, {"text": "criterion3"}, {"text": "criterion4"},{"text": "criterion5"},{"text": "criterion6"}],
   remainingQuestions: [{"text": "question1"},{"text": "question2"},{"text": "question3"},{"text": "question4"},{"text": "question5"}],
   validatedCriterions: []

 }
//shuffle EXAMPLE_GAME.remainingCriterions ??

@Component({ 
  selector: 'app-game',
  template: `
    <app-game-status [game]=game></app-game-status>
    <app-board [game]=game></app-board> <!-- app-board will need: question + criterions to display -->
    <app-players></app-players>
  `,
  styles: [
    `
      .example {
        color: red;
      }
    `
  ]
})

//Je comprends pas bien ce que ça fait // c'est la que on mettera le service pour récupérer les game data ?
// WHy does GameComponent has @input decorator ?
export class GameComponent implements OnInit {
  @Input() game: Game | null = null


  constructor() { this.game = EXAMPLE_GAME}

  ngOnInit(): void {
  }
}
