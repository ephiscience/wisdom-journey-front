import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const AVAILABLE_PLAYERS_CHOICES = [1, 2, 3];

const PLAYER_ICONS = ['dogBlack@2x.png', 'squirrelBlack.png', 'dolphinBlack.png', 'lionBlack.png', 'monkeyBlack.png', 'sheepBlack.png'];

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte">1/1 - Sélectionnez le nombre de joueurs</div>
    <div class="container">
      <div class="player" *ngFor="let item of maxNumPlayers">
        <img class="player" src="{{ '../assets/images/' + this.getIcon(item - 1) }}" alt="player icon" />
        <input class="input" #box (keyup)="onKey(box.value, item)" />
        <button class="cross" *ngIf="item > 3" (click)="removePlayer(item)"></button>
      </div>
      <button class="add-player" *ngIf="this.maxNumPlayers.length < 6" (click)="addPlayer()">
        <img class="cross" src="../assets/images/plus@2x.png" alt="add player button" />
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
      div.player {
        width: 140px;
        height: 140px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #050505;
        border-radius: 70px;
        margin-left: 20px;
        margin-right: 20px;
        text-align: center;
        font: normal normal normal 100px/100px Chela One;
        position: relative;
      }
      button.cross {
        cursor: pointer;
        top: -20px;
        left: 120px;
        width: 18px;
        height: 18px;
        background: transparent url('../assets/images/Croix@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        border: 0px;
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
      input {
        width: 135px;
        height: 20px;
      }
      button.add-player {
        width: 140px;
        height: 140px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 4px solid #050505;
        border-radius: 70px;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
      }
      img.player {
        height: 90px;
        position: relative;
        top: 20px;
      }
      img.cross {
        height: 100px;
      }
    `,
  ],
})
export class PlayerSelectionComponent {
  @Output() numPlayers = new EventEmitter<string[]>();

  maxNumPlayers = AVAILABLE_PLAYERS_CHOICES;
  playerNames = ['', '', ''];

  addPlayer(): void {
    if (this.maxNumPlayers.length + 1 <= 6) {
      this.maxNumPlayers.push(this.maxNumPlayers.length + 1);
    }
  }

  removePlayer(item: number): void {
    // TO DO better
    console.log(this.maxNumPlayers);
    console.log(this.playerNames);
    console.log(item);

    //console.log(this.maxNumPlayers[item - 1], this.maxNumPlayers[item]);
    //console.log(this.playerNames[item - 1], this.playerNames[item]);

    this.maxNumPlayers.splice(item - 1, 1);
    this.playerNames.splice(item - 1, 1);

    /* if (this.maxNumPlayers.length - item === 0) {
      console.log('zero');
      this.maxNumPlayers.splice(item - 1, 1);
      this.playerNames.splice(item - 1, 1);
    } else if (this.maxNumPlayers.length - item === 1) {
      console.log('zero');
      this.maxNumPlayers.splice(item - 1, 1, this.maxNumPlayers[item - 1]);
      this.playerNames.splice(item - 1, 1, this.playerNames[item]);
      this.maxNumPlayers.splice(item, 1);
      this.playerNames.splice(item, 1);
    } else if (this.maxNumPlayers.length - item === 2) {
      this.maxNumPlayers.splice(item - 1, 1, this.maxNumPlayers[item - 1]);
      this.playerNames.splice(item - 1, 1, this.playerNames[item]);
      this.maxNumPlayers.splice(item, 1, this.maxNumPlayers[item]);
      this.playerNames.splice(item, 1, this.playerNames[item + 1]);
      this.maxNumPlayers.splice(item + 1, 1);
      this.playerNames.splice(item + 1, 1);
    }*/

    for (let i = 0; i < this.maxNumPlayers.length; i++) {
      this.maxNumPlayers[i] = i + 1;
    }
    console.log(this.maxNumPlayers);
    console.log(this.playerNames);
  }

  onKey(value: string, item: number) {
    this.playerNames[item - 1] = value;
  }

  loadLevelSelection(): void {
    let noname = false;
    for (const index of this.playerNames) {
      if (index === '') {
        noname = true;
      }
    }
    if (noname) {
      alert('Please enter a name for each player');
    } else {
      this.numPlayers.emit(this.playerNames);
    }
  }

  getIcon(num: number) {
    return PLAYER_ICONS[num];
  }
}
