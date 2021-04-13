import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from 'src/app/services/current-game.service';
import { Game } from 'src/app/model/game.model';

@Component({
  selector: 'app-game',
  template: `
    <ng-container *ngIf="game">
      <app-game-status
        [game]="game"
        (endOfGameTurn)="updateGameStatus()"
        (pausedTimer)="updatePausedTimer($event)"
        [reloadTimer]="this.resetTimer"
        [pauseTimer]="this.pauseTime"
      ></app-game-status>
      <app-board #board [game]="game" [endOfTurn]="this.endOfTurn" (checkGameState)="checkGameState()"></app-board>
      <app-players #players [game]="game"></app-players>
      <button (click)="openModal()"></button>
      <app-modal *ngIf="modal" (answer)="closeModal($event)" [title]="this.modalTitle" [content]="this.modalContent"></app-modal>
      <div class="pause" *ngIf="this.pausedTimer" [style.height.px]="this.viewHeight"></div>
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
        background: transparent url('../../../assets/images/home@2x.png') 0 0 no-repeat padding-box;
        background-size: contain;
        border: 0;
        z-index: 100;
        cursor: pointer;
      }

      div.pause {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        /* UI Properties */
        background: #00000080 0 0 no-repeat padding-box;
        opacity: 1;
        z-index: 80;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class GameComponent implements OnInit {
  @Input() theQuestions!: number;
  @Input() thePlayers!: number;
  @Output() returnHome = new EventEmitter();

  @ViewChild('board', { read: ElementRef, static: false })
  boardView!: ElementRef;
  @ViewChild('players', { read: ElementRef, static: false })
  playersView!: ElementRef;

  game!: Game;
  pauseTime = false;
  resetTimer = false;
  modalTitle = '';
  modalContent = '';
  modal = false;
  home = false;
  answer: boolean | null = null;
  endOfGame = false;
  endOfTurn = false;
  pausedTimer = false;

  viewHeight!: number;

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
    this.modalTitle = 'Fin du Tour';
    this.modalContent = 'Auditeurs, est ce que les réponses à la question étaient pertinentes ?';
    this.endOfTurn = true;
    this.modal = true;
  }

  async checkGameState(): Promise<void> {
    //console.log('check victory conditions');
    await delay(500);
    if (this.game.remainingQuestions.length === 0 && this.game.remainingCriterions.length > 0) {
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Défaite';
      this.modalContent = 'Voulez vous rejouer ?';
      this.modal = true;
    } else if (this.game.remainingQuestions.length > 0 && this.game.remainingCriterions.length === 0) {
      this.endOfGame = true;
      this.pauseTime = true;
      this.modalTitle = 'Victoire !';
      this.modalContent = 'Voulez vous rejouer ?';
      this.modal = true;
    }
  }

  openModal(): void {
    this.modalTitle = 'Quitter';
    this.modalContent = 'Etes vous surs de vouloir quitter la partie ?';
    this.modal = true;
    this.home = true;
  }

  reloadGame() {
    this.cg.reloadGame();
  }

  updatePausedTimer(state: boolean): void {
    this.viewHeight = this.boardView.nativeElement.offsetHeight + this.playersView.nativeElement.offsetHeight;
    console.log(this.viewHeight);
    console.log(state);
    this.pausedTimer = state;
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
      this.endOfTurn = false;
    }
    return;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
