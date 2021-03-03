import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const AVAILABLE_PLAYERS_CHOICES = [3, 4, 5, 6];

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte">1 - Sélectionnez le nombre de joueurs</div>
    <div class="container">
      <button *ngFor="let item of maxNumPlayers" [style.border]="selected(item)" (click)="playerSelection(item)">
        {{ item }}
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      div.texte {
        width: 623px;
        height: 82px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
        letter-spacing: 0px;
        color: #000000;
      }
      div.container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      button {
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
    `,
  ],
})
export class PlayerSelectionComponent {
  @Output() numPlayers = new EventEmitter<number>();

  maxNumPlayers = AVAILABLE_PLAYERS_CHOICES;

  clickedButton = 0;

  playerSelection(num: number): void {
    this.clickedButton = num;
    this.numPlayers.emit(num);
  }

  selected(num: number) {
    if (num === this.clickedButton) {
      return '6px solid #050505';
    } else {
      return '2px solid #050505';
    }
  }
}
