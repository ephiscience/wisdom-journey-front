import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from '../current-game.service';
import { Game } from './game.model';

@Component({
  selector: 'app-game',
  template: `
    <ng-container *ngIf="game">
      <app-game-status
        [game]="game"
        (reloadGame)="reloadGame()"
        (endOfGameTurn)="updateGameStatus()"
        [reloadTimer]="this.resetTimer"
        [pauseTimer]="this.pauseTime"
      ></app-game-status>
      <app-board [game]="game" (reloadGame)="reloadGame()" (checkGameState)="checkGameState()"></app-board>
      <app-players [game]="game"></app-players>
      <button (click)="openModal()"></button>
      <app-modal *ngIf="modal" (answer)="closeModal($event)" [title]="this.modalTitle" [content]="this.modalContent"></app-modal>
    </ng-container>
  `,
  styles: [
    `
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
        position: fixed;
        bottom: 1%;
        right: 1%;
        width: 56px;
        height: 56px;
        background: transparent url('../assets/images/home@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        border: 0px;
        cursor: pointer;
      }
    `,
  ],
})
export class GameComponent implements OnInit {
  @Input() theQuestions!: number;
  @Input() thePlayers!: number;
  @Output() returnHome = new EventEmitter();

  game!: Game;
  pauseTime = false;
  resetTimer = false;
  modalTitle = '';
  modalContent = '';
  modal = false;
  home = false;
  answer: boolean | null = null;
  endOfGame = false;

  constructor(private cg: CurrentGameService, private router: Router) {}

  ngOnInit(): void {
    this.cg.currentGame().subscribe((game) => {
      if (game === null) {
        this.router.navigate(['']);
      } else {
        this.game = game;
      }
    });
  }

  updateGameStatus(): void {
    this.game.removeQuestion();
    this.game.changePlayerRoles();
    this.pauseTime = true;
    this.modalTitle = 'Fin de la ronda';
    this.modalContent = 'Oyentes, ¿han sido relevantes las respuestas a la pregunta?';
    this.modal = true;
  }

  async checkGameState(): Promise<void> {
    //console.log('check victory conditions');
    await delay(500);
    if (this.game.remainingQuestions.length === 0 && this.game.remainingCriterions.length > 0) {
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Derrota';
      this.modalContent = '¿Quieres volver a jugar?';
      this.modal = true;
    } else if (this.game.remainingQuestions.length > 0 && this.game.remainingCriterions.length === 0) {
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Victoria !';
      this.modalContent = '¿Quieres volver a jugar?';
      this.modal = true;
    }
  }

  openModal(): void {
    this.modalTitle = 'Dejar';
    this.modalContent = '¿Estás seguro de que quieres dejar el juego?';
    this.modal = true;
    this.home = true;
  }

  reloadGame() {
    this.cg.reloadGame();
  }

  /* function name not adequate, as the function does several things AND maybe change the order of the end condition ??*/
  closeModal(answerFromModal: boolean): void {
    this.answer = answerFromModal;
    //if it's the end of the game
    if (this.home === true) {
      console.log('modal close');
      if (answerFromModal === true) {
        this.router.navigate(['']);
      }
      this.home = false;
      this.modal = false;
      return;
    }
    if (this.endOfGame === true) {
      this.endOfGame = false;
      this.modal = false;
      this.pauseTime = false;
      if (this.answer === true) {
        this.reloadGame();
      } else {
        this.router.navigate(['']);
      }
      //if it's end of game turn
    } else {
      if (this.answer === true) {
        this.game.removeAdditionalCriterion();
      }
      this.modal = false;
      this.checkGameState();
      this.pauseTime = false;
    }
    return;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
