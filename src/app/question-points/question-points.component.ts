import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-question-points',
  template: ` <div class="image" [@fade]="'in'" *ngFor="let item of game.remainingQuestions"></div> `,
  styles: [
    `
      :host {
        width: 333px;
        height: 60px;
        place-self: center;
        margin-right: 30px;
        padding-right: 5px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #404040;
        border-radius: 12px;
        opacity: 1;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
      div.image {
        width: 33px;
        height: 47px;
        background: transparent url('../assets/images/Inverse_question@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        opacity: 1;
        margin: 2px;
      }
    `,
  ],
  animations: [
    trigger('fade', [state('in', style({ opacity: 1 })), transition('* => void', animate('500ms ease-out', style({ opacity: 0 })))]),
  ],
})
export class QuestionPointsComponent implements OnInit {
  @Input() game!: Game;

  constructor() {}

  ngOnInit(): void {}
}
