import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/model/game.model';

@Component({
  selector: 'app-player',
  template: `
    <div *ngIf="orateur; else listener" class="outer speaker">
      <img class="icon" src="{{ '../assets/images/' + player.blackIcon }}" alt="player icon" />
      <img class="role" src="../../../../assets/images/talk@2x.png" alt="player role" />
    </div>
    <ng-template #listener>
      <div class="outer listener">
        <img class="icon" src="{{ '../assets/images/' + player.whiteIcon }}" alt="player icon" />
        <img class="role" src="../../../../assets/images/tap@2x.png" alt="player role" />
      </div>
    </ng-template>
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
        border: 2px solid #000000;
        opacity: 1;
        border-radius: 40px;
      }
      .outer.speaker {
        background: #ffffff 0% 0% no-repeat padding-box;
      }
      .outer.listener {
        background: #707070 0% 0% no-repeat padding-box;
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
        left: 36px;
        height: 44px;
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
export class PlayerComponent {
  @Input() player!: Player;
  @Input() orateur!: boolean; // TODO ???

  constructor() {}
}