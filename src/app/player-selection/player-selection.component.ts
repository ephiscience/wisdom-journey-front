import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from '../current-game.service';

const AVAILABLE_PLAYERS_CHOICES = [3, 4, 5, 6];

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte">1/1 - Sélectionnez le nombre de joueurs</div>
    <div class="container">
      <button class="player" *ngFor="let item of maxNumPlayers" [style.border]="selected(item)" (click)="playerSelection(item)">
        {{ item }}
      </button>
    </div>
    <button class="play" (click)="loadLevelSelection()">Continuer -></button>
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
      div.texte {
        width: 100vw;
        height: 82px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
        letter-spacing: 0px;
        color: #000000;
      }
      div.container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }
      button.player {
        width: 133px;
        height: 133px;
        background: #fddcbb 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000057;
        border: 2px solid #050505;
        border-radius: 100px;
        margin-left: 20px;
        margin-right: 20px;
        padding-bottom: 22px;
        text-align: center;
        font: normal normal normal 100px/100px Chela One;
        cursor: pointer;
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
export class PlayerSelectionComponent {
  @Output() numPlayers = new EventEmitter<number>();

  maxNumPlayers = AVAILABLE_PLAYERS_CHOICES;

  clickedButton = 0;

  playerSelection(num: number): void {
    this.clickedButton = num;
  }

  selected(num: number) {
    if (num === this.clickedButton) {
      return '6px solid #050505';
    } else {
      return '2px solid #050505';
    }
  }

  loadLevelSelection(): void {
    if (this.clickedButton === 0) {
      alert('Please select a number of players');
    } else {
      this.numPlayers.emit(this.clickedButton);
    }
  }
}
