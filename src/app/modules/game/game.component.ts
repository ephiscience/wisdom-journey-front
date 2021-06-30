import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from 'src/app/services/current-game.service';
import { Game } from 'src/app/model/game';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuitGameConfirmationModalComponent } from 'src/app/modules/shared/quit-game-confirmation-modal/quit-game-confirmation-modal.component';
import { EndOfTurnModalComponent } from './end-of-turn-modal/end-of-turn-modal.component';
import { VictoryModalComponent } from './victory-modal/victory-modal.component';
import { DefeatModalComponent } from './defeat-modal/defeat-modal.component';

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
      <button class="home" (click)="openQuitGameModal()"></button>
      <button class="parameters" (click)="openParameters()">{{ this.game.language }}</button>
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

      button.home {
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

      button.parameters {
        position: fixed;
        bottom: 1%;
        left: 1%;
        width: 56px;
        height: 56px;
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
  resetTimer = false; //is this useful ???
  endOfTurn = false;
  pausedTimer = false;

  viewHeight!: number;

  langs = ['fr', 'en', 'de', 'es'];

  constructor(private cg: CurrentGameService, private router: Router, private modalService: NgbModal) {}

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
    this.endOfTurn = true;
    this.openEndOfTurnModal();
  }

  checkGameState(): void {
    if (this.game.remainingQuestions.length === 0 && this.game.remainingCriterions.length > 0) {
      this.openDefeatModal();
    } else if (this.game.remainingQuestions.length > 0 && this.game.remainingCriterions.length === 0) {
      this.openVictoryModal();
    }
  }

  openParameters(): void {
    //getting question ids
    const nextLang = this.langs[(this.langs.indexOf(this.game.language) + 1) % this.langs.length];
    //reload questions and criterions with a different language
    this.cg.changeGameLanguage(nextLang);
  }

  openQuitGameModal(): void {
    this.pauseTime = true;
    this.handleQuitGameModalResult(this.modalService.open(QuitGameConfirmationModalComponent, { backdrop: 'static' }).result);
  }

  handleQuitGameModalResult(p: Promise<unknown>) {
    p.then(
      () => {
        this.pauseTime = false;
        this.router.navigate(['/']);
      },
      () => {
        this.pauseTime = false;
      }
    );
  }

  openEndOfTurnModal(): void {
    this.pauseTime = true;
    this.handleEndofTurnModalResult(this.modalService.open(EndOfTurnModalComponent, { backdrop: 'static' }).result);
  }

  handleEndofTurnModalResult(p: Promise<unknown>) {
    p.then(
      () => {
        this.game.removeAdditionalCriterion();
        this.checkGameState();
        this.endOfTurn = false;
        this.pauseTime = false;
      },
      () => {
        this.checkGameState();
        this.endOfTurn = false;
        this.pauseTime = false;
      }
    );
  }

  openVictoryModal(): void {
    this.pauseTime = true;
    this.handleVictoryModalResult(this.modalService.open(VictoryModalComponent, { backdrop: 'static' }).result);
  }
  handleVictoryModalResult(p: Promise<unknown>) {
    p.then(
      () => {
        this.reloadGame();
      },
      () => {
        this.router.navigate(['']);
      }
    );
  }

  openDefeatModal(): void {
    this.pauseTime = true;
    this.handleDefeatModalResult(this.modalService.open(DefeatModalComponent, { backdrop: 'static' }).result);
  }
  handleDefeatModalResult(p: Promise<unknown>) {
    p.then(
      () => {
        this.reloadGame();
      },
      () => {
        this.router.navigate(['']);
      }
    );
  }

  reloadGame() {
    this.cg.reloadGame();
  }

  updatePausedTimer(state: boolean): void {
    this.viewHeight = this.boardView.nativeElement.offsetHeight + this.playersView.nativeElement.offsetHeight;
    //console.log(this.viewHeight);
    //console.log(state);
    this.pausedTimer = state;
  }
}

//function delay(ms: number) {
// return new Promise((resolve) => setTimeout(resolve, ms));
//}
