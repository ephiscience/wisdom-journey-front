import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissingPlayerNameModalComponent } from '../missing-player-name-modal/missing-player-name-modal.component';

const AVAILABLE_PLAYERS_CHOICES = [1, 2, 3];

const PLAYER_ICONS = ['dogBlack.png', 'squirrelBlack.png', 'dolphinBlack.png', 'lionBlack.png', 'monkeyBlack.png', 'sheepBlack.png'];

export interface Player {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte">
      1/2 -
      <ng-container i18n>Select the number of players</ng-container>
    </div>
    <div class="container">
      <div class="player" *ngFor="let player of players">
        <img class="player-img" src="assets/images/{{ player.icon }}" alt="player icon" />
        <input
          class="input"
          i18n-placeholder="Player name input placeholder"
          placeholder="Enter your name here"
          [(ngModel)]="player.name"
        />
        <button class="cross" *ngIf="players.length > 3" (click)="removePlayer(player)"></button>
      </div>
      <button class="add-player" *ngIf="players.length < 6" (click)="addPlayer()">
        <img class="cross-img" src="assets/images/plus@2x.png" alt="add player button" />
      </button>
    </div>
    <button class="play" (click)="loadLevelSelection()" i18n="continue|Go the the next step">Continue</button>
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

      .texte {
        width: 100vw;
        height: 82px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
        letter-spacing: 0px;
        color: #000000;
      }

      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }

      .player {
        width: 140px;
        height: 140px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #050505;
        border-radius: 70px;
        text-align: center;
        font: normal normal normal 100px/100px Chela One;
        position: relative;
      }

      .cross {
        cursor: pointer;
        top: -20px;
        left: 120px;
        width: 18px;
        height: 18px;
        background: transparent url('src/assets/images/Croix@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        border: 0px;
        position: absolute;
      }

      .play {
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
        height: 25px;
        font: normal normal normal 14px/13px Roboto;
      }

      .add-player {
        width: 140px;
        height: 140px;
        background: #ffc892 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 4px solid #050505;
        border-radius: 140px;
        flex-shrink: 0;
        cursor: pointer;
      }

      .player-img {
        margin-top: 20px;
        height: 90px;
        top: 20px;
      }

      .cross-img {
        height: 100px;
      }
    `,
  ],
})
export class PlayerSelectionComponent implements OnInit {
  @Output() numPlayers = new EventEmitter<Player[]>();

  players: Player[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.addPlayer();
    }
  }

  addPlayer(): void {
    if (this.players.length < 6) {
      this.players.push({
        icon: this.nextIcon(),
        name: '',
      });
    }
  }

  nextIcon(): string {
    return PLAYER_ICONS.filter((e) => !this.players.map((p) => p.icon).includes(e))[0];
  }

  removePlayer(item: Player): void {
    this.players = this.players.filter((e) => e !== item);
    //console.log(item);
  }

  // onKey(value: string, item: number) {
  //   this.playerNames[item - 1] = value;
  // }

  loadLevelSelection(): void {
    const noname = this.players.filter((p) => p.name === '').length > 0;

    if (noname) {
      this.openMissingPlayerNameModal();
    } else {
      this.numPlayers.emit(this.players);
    }
  }

  getIcon(num: number) {
    return PLAYER_ICONS[num];
  }

  openMissingPlayerNameModal(): void {
    this.modalService.open(MissingPlayerNameModalComponent, { backdrop: 'static' });
  }
}
