import { Component, Input, OnInit } from '@angular/core';
import { Criterion, Question } from '../board/board.component';

export interface Player {
  name: string;
}

export interface Game {
  players: Player[];
  remainingCriterions: Criterion[];
  remainingQuestions: Question[];
  validatedCriterions: Criterion[];
}

// TODO: build an exmaple game her
const EXAMPLE_GAME: Game = {
  players: [{name: 'player 1'}, {name: 'player 2'}, {name: 'player 3'}, {name: 'player 4'}],
  remainingCriterions: [
    {text: 'criterion 1'},
    {text: 'criterion 2'},
    {text: 'criterion 1'},
    {text: 'criterion 3'},
    {text: 'criterion 3'},
    {text: 'criterion 2'}
  ],
  remainingQuestions: [{text: 'question1'}, {text: 'question2'}, {text: 'question3'}, {text: 'question4'}, {text: 'question5'}],
  validatedCriterions: []
};

// shuffle EXAMPLE_GAME.remainingCriterions ??

@Component({
  selector: 'app-game',
  template: `
    <app-game-status [game]=game (shuffleRoless)="triggerChangesInPlayerComp()"></app-game-status>
    <app-board [game]=game></app-board>
    <app-players [game]=game [shuffles]="playerShuffle"></app-players>
  `
})


export class GameComponent implements OnInit {
  @Input() game: Game;
  playerShuffle = true;

  constructor() {
    this.game = EXAMPLE_GAME;
  }

  ngOnInit(): void {
    this.assertInputsProvided();
  }

  triggerChangesInPlayerComp(): void {
    this.playerShuffle = !this.playerShuffle;
  }

  private assertInputsProvided(): void {
    if (!this.game) {
      throw (new Error('The required input [game] was not provided'));
    }
  }
}
