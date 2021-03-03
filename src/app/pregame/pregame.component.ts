import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from '../current-game.service';

@Component({
  selector: 'app-pregame',
  template: `
    <app-player-selection (numPlayers)="numPlayersSelection($event)"></app-player-selection>
    <app-level-selection (maxQuestions)="maxQuestionsSelection($event)"></app-level-selection>
    <button class="play" (click)="launchGame()">Créer la partie</button>
    <button class="home" routerLink=""></button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
      }
      button.play {
        width: 567px;
        height: 114px;
        background: #ffa935 0% 0% no-repeat padding-box;
        box-shadow: 3px 3px 3px #0000005f;
        border: 3px solid #707070;
        border-radius: 74px;
        text-align: center;
        font: normal normal normal 70px/82px Chela One;
        letter-spacing: 0px;
        cursor: pointer;
      }
      button.home {
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
export class PregameComponent {
  @Output() startGame = new EventEmitter<number[]>();
  @Output() returnHome = new EventEmitter();
  numPlayers = 0;
  maxQuestions = 0;

  constructor(private cg: CurrentGameService, private router: Router) {}

  numPlayersSelection(num: number): void {
    this.numPlayers = num;
  }
  maxQuestionsSelection(num: number): void {
    this.maxQuestions = num;
  }

  launchGame(): void {
    console.log(this.numPlayers);
    console.log(this.maxQuestions);
    if (this.numPlayers === 0) {
      alert('Please select a number of Players');
    }
    if (this.maxQuestions === 0) {
      alert('Please select a level');
    }
    if (this.numPlayers !== 0 && this.maxQuestions !== 0) {
      this.cg.createGame(this.maxQuestions, this.numPlayers);
      this.router.navigate(['game']);
    }
  }

  loadHome(): void {
    this.returnHome.emit();
  }
}
