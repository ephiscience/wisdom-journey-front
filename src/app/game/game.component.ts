import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Criterion, Question } from '../board/board.component';

function shuffle(array: any[]): Array<any> {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export interface Player {
  name: string;
  speaking: boolean;
}

export interface Game {
  players: Player[];
  remainingCriterions: Criterion[];
  remainingQuestions: Question[];
  validatedCriterions: Criterion[];
}

// TODO: build an exmaple game her
const EXAMPLE_GAME: Game = {
  players: [
    {name: 'player 1', speaking: true},
    {name: 'player 2', speaking: true},
    {name: 'player 3', speaking: false},
    {name: 'player 4', speaking: false}
  ],
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
    <app-game-status [game]=game (shuffleRoless)="changePlayerRoles()" (reloadGame)="reloadGame()"></app-game-status>
    <app-board [game]=game (reloadGame)="reloadGame()"></app-board>
    <app-players [game]=game></app-players>
  `
})


export class GameComponent implements OnInit{
  @Input() game: Game;

  constructor() {
    this.game = EXAMPLE_GAME;
    this.changePlayerRoles();
  }

  ngOnInit(): void {
    this.assertInputsProvided();
  }

  changePlayerRoles(): void {
    let playerRoles: boolean[] = [];
    for (const player of this.game.players){
      playerRoles.push(player.speaking);
    }
    //console.log(playerRoles);
    playerRoles = shuffle(playerRoles);
    //console.log(playerRoles);
    for (let i = 0; i < this.game.players.length; i ++){
      this.game.players[i].speaking = playerRoles[i];
    }
  }
  reloadGame(): void {
    console.log('reload game data');
    //refetch data from server or shuffle ?
    //reset timer
  }

  private assertInputsProvided(): void {
    if (!this.game) {
      throw (new Error('The required input [game] was not provided'));
    }
  }
}
