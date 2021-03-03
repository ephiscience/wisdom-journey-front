import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-selection',
  template: `
    <div class="texte"> 2 - Sélectionnez la difficulté </div>
    <div class="container">
      <button *ngFor="let item of this.levels, index as i" [style.background]="getBackground(i)"
      [style.border]="selected(i)" (click)="this.clickedButton = i; levelSelection(this.levels[i])">
        <div class="upper-text"> {{this.upperText[i]}} </div>
        <img class="icon" src="{{'../assets/images/' + this.iconName[i] }}" alt="level icon">
        <div class="lower-text"> {{this.lowerText[i]}} </div>
      </button>
    </div>
  `,
  styles: [`
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
    background: #E4F4B2 0% 0% no-repeat padding-box;
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

  `]
})
export class LevelSelectionComponent implements OnInit {
  @Output() maxQuestions = new EventEmitter<number>();
  levels: number[] = [8,6,4,3]; /*number of max questions*/
  upperText: string[] = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
  iconName: string[] = ['debutant.png', 'intermediaire.png', 'avance.png', 'expert.png'];
  lowerText: string[] = ['8 ou 7 questions', '6 ou 5 questions', '4 questions', '3 questions'];
  background: string[] =
    ['#E4F4B2 0% 0% no-repeat padding-box',
    '#FFF0BF 0% 0% no-repeat padding-box',
    '#FFD4BC 0% 0% no-repeat padding-box',
    '#FFC5BC 0% 0% no-repeat padding-box'];
  clickedButton = -1;

  constructor() { }

  ngOnInit(): void {
  }

  levelSelection(numQuestions: number): void {
    this.maxQuestions.emit(numQuestions);
  }

  getBackground(i: number): string {
    if (i === 0) {
      return '#E4F4B2 0% 0% no-repeat padding-box';
    } else if (i === 1) {
      return '#FFF0BF 0% 0% no-repeat padding-box';
    } else if (i === 2) {
      return '#FFD4BC 0% 0% no-repeat padding-box';
    } else {
      return '#FFC5BC 0% 0% no-repeat padding-box';
    }
  }

  selected(num: number){
    if (num === this.clickedButton) {
      return '6px solid #050505';
    } else {
      return '2px solid #050505';
    }
  }

}
