import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Level {
  title: string;
  description: string;
  icon: string;
  cardCount: number;
  background: string;
}

const LEVELS: Level[] = [
  {
    title: 'Débutant',
    description: '8 questions',
    icon: 'debutant.png',
    background: '#E4F4B2 0% 0% no-repeat padding-box',
    cardCount: 8,
  },
  {
    title: 'Intermédiaire',
    description: '6 questions',
    icon: 'intermediaire.png',
    background: '#FFF0BF 0% 0% no-repeat padding-box',
    cardCount: 6,
  },
  {
    title: 'Avancé',
    description: '4 questions',
    icon: 'avance.png',
    background: '#FFD4BC 0% 0% no-repeat padding-box',
    cardCount: 4,
  },
  {
    title: 'Expert',
    description: '3 questions',
    icon: 'expert.png',
    background: '#FFC5BC 0% 0% no-repeat padding-box',
    cardCount: 3,
  },
];

@Component({
  selector: 'app-level-selection',
  template: `
    <div class="texte">2 - Sélectionnez la difficulté</div>
    <div class="container">
      <button *ngFor="let item of levels" [style.background]="item.background" [style.border]="selected(item)" (click)="levelSelection(item)">
        <div class="upper-text">{{ item.title }}</div>
        <img class="icon" src="../assets/images/{{ item.icon }}" alt="level icon" />
        <div class="lower-text">{{ item.description }}</div>
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
      div.upper-text {
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
      img {
        top: 50px;
        left: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      div.lower-text {
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
export class LevelSelectionComponent {
  @Output() maxQuestions = new EventEmitter<number>();
  levels = LEVELS;

  clickedButton?: Level;

  levelSelection(level: Level): void {
    this.clickedButton = level;
    this.maxQuestions.emit(level.cardCount);
  }

  selected(num: Level) {
    if (num === this.clickedButton) {
      return '6px solid #050505';
    } else {
      return '2px solid #050505';
    }
  }
}
