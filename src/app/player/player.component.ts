import { Component, OnInit, Input } from '@angular/core';
import { Player} from '../game/game.component';

@Component({
  selector: 'app-player',
  template: `
    <div class="outer" [style.background]="getBackgroundColor()">
      <div class="icon" [style.background]="getIcon()" [ngStyle]="{'background-size': contain}"></div>
      <div class="role" [style.background]="getRole()" [ngStyle]="{'background-size': contain}"></div>
    </div>
    <div class="name"> {{ player.name }} </div>
  `,
  styles: [`
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
  div.icon {
    top: 17px;
    left: 38px;
    width: 38px;
    height: 46px;
    background: transparent url('../assets/images/dog@2x.png') 0% 0% no-repeat padding-box;
    background-size: contain;
    opacity: 1;
    z-index: 10;
    position: absolute;

  }
  div.role {
    top:-10px;
    left: 65px;
    width: 42px;
    height: 39px;
    background: transparent url('../assets/images/talk@2x.png') 0% 0% no-repeat padding-box;
    background-size: contain;
    opacity: 1;
    z-index: 10;
    position: absolute;

  }

  `]
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player;
  @Input() orateur!: boolean;

  constructor() {}

  ngOnInit(): void {}

  getBackgroundColor(): string {
    if (this.orateur === true) {
      return '#FFFFFF 0% 0% no-repeat padding-box';
    }
    else {
      return '#707070 0% 0% no-repeat padding-box';
    }
  }

  getIcon(): string {
    if (this.orateur === true) {
      return 'transparent url("../assets/images/dogBlack@2x.png") 0% 0% no-repeat padding-box';
    }
    else {
      return 'transparent url("../assets/images/dog@2x.png") 0% 0% no-repeat padding-box';
    }
  }
  getRole(): string {
    if (this.orateur === true) {
      return 'transparent url("../assets/images/talk@2x.png") 50% 50% no-repeat padding-box';
    }
    else {
      return 'transparent url("../assets/images/tap@2x.png") 0% 0% no-repeat padding-box';
    }
  }
}
