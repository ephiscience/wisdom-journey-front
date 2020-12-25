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
   remainingCriterions: [{"text": "criterion 1"}, {"text": "criterion 2"}, {"text": "criterion 1"}, {"text": "criterion 3"},{"text": "criterion 3"},{"text": "criterion 2"}],
   remainingQuestions: [{"text": "question1"},{"text": "question2"},{"text": "question3"},{"text": "question4"},{"text": "question5"}],
   validatedCriterions: []

 }
//shuffle EXAMPLE_GAME.remainingCriterions ??

@Component({ 
  selector: 'app-game',
  template: `
    <app-game-status [game]=game (shuffleRoless)="triggerChangesInPlayerComp()" ></app-game-status>
    <app-board [game]=game></app-board> <!-- app-board will need: question + criterions to display -->
    <app-players [game]=game [shuffles]="playerShuffle"></app-players>
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
  @Input() game: Game
  playerShuffle: boolean = true 


  constructor() { this.game = EXAMPLE_GAME}

  ngOnInit(): void {
    this.assertInputsProvided(); 
  }

  //do I need this ? 
  private assertInputsProvided(): void {
    if (!this.game) { 
      throw (new Error("The required input [game] was not provided"));
    }
  }

  triggerChangesInPlayerComp(){
    this.playerShuffle  = ! this.playerShuffle 
  }
}
