import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../game/game.model';

@Component({
  selector: 'app-player',
  template: `
    <div class="outer" [style.background]="getBackgroundColor()">
      <img class="icon" src="{{ '../assets/images/' + this.getIcon() }}" alt="player icon" />
      <img class="role" src="{{ '../assets/images/' + this.getRole() }}" alt="player role" />
    </div>
    <div class="name">{{ player.name }}</div>
  `,
  styles: [
    `
      :host {
        position: relative;
      }
      div.outer {
        width: 70px;
        height: 70px;
        margin-left: 20px;
        margin-right: 20px;
        background: #707070 0% 0% no-repeat padding-box;
        border: 2px solid #000000;
        opacity: 1;
        border-radius: 40px;
      }
      div.name {
        width: 110px;
        height: 43px;
        text-align: center;
        font: normal normal 300 25px/40px Pacifico;
        letter-spacing: 0px;
        color: #000000;
      }
      img.icon {
        top: 17px;
        left: 38px;
        width: 38px;
        height: 46px;
        opacity: 1;
        z-index: 10;
        position: absolute;
      }
      img.role {
        top: -10px;
        left: 65px;
        width: 42px;
        height: 39px;
        opacity: 1;
        z-index: 10;
        position: absolute;
      }
    `,
  ],
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player;
  @Input() orateur!: boolean;

  constructor() {}

  ngOnInit(): void {}

  getBackgroundColor(): string {
    if (this.orateur === true) {
      return '#FFFFFF 0% 0% no-repeat padding-box';
    } else {
      return '#707070 0% 0% no-repeat padding-box';
    }
  }

  getIcon(): string {
    if (this.orateur === true) {
      return 'dogBlack@2x.png';
    } else {
      return 'dog@2x.png';
    }
  }
  getRole(): string {
    if (this.orateur === true) {
      return 'talk@2x.png';
    } else {
      return 'tap@2x.png';
    }
  }
}
