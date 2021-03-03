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

export class Game {
  players: Player[];
  remainingCriterions: Criterion[];
  remainingQuestions: Question[];
  validatedCriterions: Criterion[];

  constructor(players: Player[], remainingCriterions: Criterion[], remainingQuestions: Question[]) {
     this.players = players;
     this.remainingCriterions = remainingCriterions;
     this.remainingQuestions = remainingQuestions;
     this.validatedCriterions = [];
     this.changePlayerRoles();
  }

  removeCriterion(c: Criterion, i: number): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      this.validatedCriterions.push(c);
      this.remainingCriterions.splice(i, 1);
    }
  }

  removeAdditionalCriterion(): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      const removedCriterionText = this.remainingCriterions[this.remainingCriterions.length - 1].text;
      this.remainingCriterions.splice(-1, 1);
      this.validatedCriterions.push({text: removedCriterionText});
    }
  }

  removeQuestion(): void {
    if (this.remainingCriterions == null) {
      return;
    } else {
      this.remainingQuestions.shift();
    }
  }
  changePlayerRoles(): void {
    let playerRoles: boolean[] = [];
    for (const player of this.players){
      playerRoles.push(player.speaking);
    }
    playerRoles = shuffle(playerRoles);
    for (let i = 0; i < this.players.length; i ++) {
      this.players[i].speaking = playerRoles[i];
    }
  }
};


const examplePlayers: Player[] = [
  {name: 'player 1', speaking: true},
  {name: 'player 2', speaking: true},
  {name: 'player 3', speaking: false},
  {name: 'player 4', speaking: false},
  {name: 'player 5', speaking: false},
  {name: 'player 6', speaking: false}
];

const exampleCriterions: Criterion[] = [
  {text: 'criterion 1'},
  {text: 'criterion 2'},
  {text: 'criterion 1'},
  {text: 'criterion 3'},
  {text: 'criterion 3'},
  {text: 'criterion 2'}
];

const exampleQuestions: Question[] = [
  {text: 'question1'},
  {text: 'question2'},
  {text: 'question3'},
  {text: 'question4'},
  {text: 'question5'},
  {text: 'question6'},
  {text: 'question7'},
  {text: 'question8'},
  {text: 'question9'}
];

@Component({
  selector: 'app-game',
  template: `
    <app-game-status [game]=game (reloadGame)="reloadGame()" (endOfGameTurn)="updateGameStatus()" [reloadTimer]=this.resetTimer [pauseTimer]=this.pauseTime></app-game-status>
    <app-board [game]=game (reloadGame)="reloadGame()" (checkGameState)="checkGameState()"></app-board>
    <app-players [game]=game></app-players>
    <button (click)="loadHome()"></button>
    <app-modal *ngIf="modal" (answer)="closeModal($event)" [title]=this.modalTitle [content]=this.modalContent></app-modal>
  `,
  styles: [`
  :host {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100vh;
  }
  app-game-status {
    flex: 1;
  }
  app-board {
    flex: 5;
  }
  app-players {
    flex: 1;
  }
  button {
    position:fixed;
    bottom:1%;
    right:1%;
    width: 56px;
    height: 56px;
    background: transparent url('../assets/images/home@2x.png') 0% 0% no-repeat padding-box;
    background-size:contain;
    border: 0px;
    cursor: pointer;
  }

  `]
})

export class GameComponent implements OnInit {
  @Input() game: Game;
  @Input() theQuestions!: number;
  @Input() thePlayers!: number;
  @Output() returnHome = new EventEmitter();
  pauseTime = false;
  resetTimer = false;
  modalTitle = '';
  modalContent = '';
  modal = false;
  answer: boolean| null = null;
  endOfGame = false;

  constructor() {
    this.game = new Game( [], [], []);
  }

  ngOnInit(): void {
    this.assertInputsProvided();
    this.reloadGame();
  }

  reloadGame(): void {
    this.resetTimer = !this.resetTimer;
    const newExamplePlayers = [{name: 'player 1', speaking: true},{name: 'player 2', speaking: true},{name: 'player 3', speaking: false} ];
    for (let i=3; i < this.thePlayers; i ++) {
      newExamplePlayers.push({name: 'player' + (i+1), speaking: false});
    }
    const newExampleQuestions: Question[] = [];
    for (let i=1; i <= this.theQuestions; i ++) {
      newExampleQuestions.push({text: 'question question question question question' + i});
    }
    const newExampleCriterions: Criterion[] = [
      {text: 'criterion 1'},
      {text: 'criterion 2'},
      {text: 'criterion 1'},
      {text: 'criterion 3'},
      {text: 'criterion 3'},
      {text: 'criterion 2'}
    ];
    this.game = new Game( newExamplePlayers, newExampleCriterions, newExampleQuestions);

    //refetch data from server or shuffle ?
  }

  loadHome(): void {
    this.returnHome.emit();
  }

  updateGameStatus(): void {
    this.game.removeQuestion();
    this.game.changePlayerRoles();
    this.pauseTime = true;
    this.modalTitle = 'Fin du Tour';
    this.modalContent = 'Auditeurs, est ce que les réponses à la question étaient pertinentes ?';
    this.modal = true;
  }
  async checkGameState(): Promise<void> {
    console.log('check victory conditions');
    await delay(500);
    if (this.game.remainingQuestions.length === 0 && this.game.remainingCriterions.length > 0){
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Défaite';
      this.modalContent = 'Voulez vous rejouer ?';
      this.modal = true;
    }
    else if (this.game.remainingQuestions.length > 0 && this.game.remainingCriterions.length === 0){
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Victoire !';
      this.modalContent = 'Voulez vous rejouer ?';
      this.modal = true;
    }
  }

  openModal(): void {
    this.modal = true;
  }

  /* function name not adequate, as the function does several things AND maybe change the order of the end condition ??*/
  closeModal(answerFromModal: boolean): void {
    this.answer = answerFromModal;
    //if it's the end of the game
    if (this.endOfGame === true) {
      this.endOfGame = false;
      this.modal = false;
      this.pauseTime = false;
      if (this.answer === true){
        this.reloadGame();
      } else {
        this.loadHome();
      }
    //if it's end of game turn
    } else {
      if (this.answer === true){
        this.game.removeAdditionalCriterion();
      }
      this.modal = false;
      this.checkGameState();
      this.pauseTime = false;
    }
  }

  private assertInputsProvided(): void {
    if (!this.game) {
      throw (new Error('The required input [game] was not provided'));
    }
  }

}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


