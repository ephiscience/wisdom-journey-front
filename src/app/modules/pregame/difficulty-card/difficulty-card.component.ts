import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LevelData } from 'src/app/modules/pregame/level-selection/level-selection.component';

@Component({
  selector: 'app-difficulty-card',
  template: `
    <button *ngIf="item" class="level" [style.backgroundColor]="item.backgroundColor" [class.selected]="selected"
            (click)="clicked.next()">
      <div class="upper-text">
        {{ item.title }}
      </div>
      <img class="icon" src="assets/images/{{ item.icon }}" alt="level icon"/>
      <div class="lower-text">
        {{ item.cardCount }}
        <ng-container i18n>questions</ng-container>
      </div>
    </button>
  `,
  styles: [
    `
      .level {
        width: 176px;
        height: 189px;
        background: #e4f4b2 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000057;
        border: 2px solid #050505;
        border-radius: 25px;
        margin-left: 15px;
        margin-right: 15px;
        position: relative;
        cursor: pointer;
      }

      .level.selected {
        border: 6px solid #050505;
      }

      .upper-text {
        top: 10px;
        left: -2px;
        position: absolute;
        width: 176px;
        height: 41px;
        text-align: center;
        font: normal normal normal 30px/35px Chela One;
        letter-spacing: 0px;
        color: #000000;
      }

      .icon {
        top: 50px;
        left: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .lower-text {
        top: 150px;
        left: -2px;
        position: absolute;
        width: 176px;
        height: 41px;
        text-align: center;
        font: normal normal normal 20px/24px Roboto;
        letter-spacing: 0px;
        color: #000000;
      }
    `,
  ],
})
export class DifficultyCardComponent implements OnInit {
  @Input() item!: LevelData;
  @Input() selected = false;
  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
