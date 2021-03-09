import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from '../current-game.service';

const AVAILABLE_PLAYERS_CHOICES = [1, 2, 3];

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte">1/1 - Sélectionnez le nombre de joueurs</div>
    <div class="container">
      <div class="player" *ngFor="let item of maxNumPlayers">
        {{ item }}
        <button class="cross" *ngIf="item > 3" (click)="removePlayer()"></button>
      </div>
      <button class="add-player" *ngIf="this.maxNumPlayers.length < 6" (click)="addPlayer()"></button>
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
      div.player {
        width: 140px;
        height: 190px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #050505;
        border-radius: 15px;
        margin-left: 20px;
        margin-right: 20px;
        text-align: center;
        font: normal normal normal 100px/100px Chela One;
        position: relative;
      }
      button.cross {
        cursor: pointer;
        width: 11px;
        height: 10px;
        position: absolute;
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
      button.add-player {
        width: 142px;
        height: 194px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #050505;
        border-radius: 15px;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class PlayerSelectionComponent {
  @Output() numPlayers = new EventEmitter<number>();

  maxNumPlayers = AVAILABLE_PLAYERS_CHOICES;

  addPlayer(): void {
    if (this.maxNumPlayers.length + 1 <= 6) {
      this.maxNumPlayers.push(this.maxNumPlayers.length + 1);
    }
  }

  removePlayer(): void {
    if (this.maxNumPlayers.length - 1 >= 1) {
      this.maxNumPlayers.splice(this.maxNumPlayers.length - 1, 1);
    }
  }

  loadLevelSelection(): void {
    // alert if there is a player with no name
    console.log(this.maxNumPlayers.length);
    this.numPlayers.emit(this.maxNumPlayers.length);
  }
}
