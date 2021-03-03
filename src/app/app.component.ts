import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-home *ngIf="home" (pregame)="launchPreGame()"></app-home>
      <app-pregame *ngIf="pregame" (startGame)="launchGame($event)" (returnHome)="launchHome()"> </app-pregame>
      <app-game *ngIf="game" (returnHome)="launchHome()" [theQuestions]="this.maxQuestions" [thePlayers]="this.numPlayers"> </app-game>
  `,
  styles: []
})
export class AppComponent {
  home = true;
  pregame = false;
  game = false;
  maxQuestions = 0;
  numPlayers = 0;

  launchPreGame(): void {
    this.home = false;
    this.pregame = true;
    this.game = false;
  }

  launchGame(lala: number[]): void {
    console.log(this.maxQuestions, this.numPlayers);
    this.home = false;
    this.pregame = false;
    this.game = true;
    this.numPlayers = lala[0];
    this.maxQuestions = lala[1];
    console.log(this.maxQuestions, this.numPlayers);
  }

  launchHome(): void {
    this.home = true;
    this.pregame = false;
    this.game = false;
  }

}
