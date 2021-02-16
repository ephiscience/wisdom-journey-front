import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-selection',
  template: `
    <div class="texte"> 1 - Sélectionnez le nombre de joueurs </div>
    <div class="container">
      <button *ngFor="let item of this.maxNumPlayers, index as i"  [style.border]="selected(i)"
      (click)="this.clickedButton = i; playerSelection(this.maxNumPlayers[i])"> {{this.maxNumPlayers[i]}} </button>
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
      width: 133px;
      height: 133px;
      background: #FDDCBB 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000057;
      border: 2px solid #050505;
      border-radius: 100px;
      margin-left: 20px;
      margin-right:20px;
      padding-bottom: 22px;
      text-align: center;
      font: normal normal normal 100px/100px Chela One;

    }
    `]
})
export class PlayerSelectionComponent implements OnInit {
  @Output() numPlayers = new EventEmitter<number>();
  maxNumPlayers: number[] = [3,4,5,6];
  clickedButton = -1;

  constructor() { }

  ngOnInit(): void {
  }

  playerSelection(num: number): void {
    this.numPlayers.emit(num);
  }

  selected(num: number){
    if (num === this.clickedButton) {
      return '6px solid #050505';
    } else {
      return '2px solid #050505';
    }
  }


}
