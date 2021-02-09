import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-home *ngIf="home; else elseHome" (pregame)="launchPreGame()"></app-home>
        <ng-template #elseHome></ng-template>
      <app-pregame *ngIf="pregame; else elsePreGame" (startGame)="launchGame()" (returnHome)="launchHome()"> </app-pregame>
        <ng-template #elsePreGame></ng-template>
      <app-game *ngIf="game; else elseGame" (returnHome)="launchHome()"> </app-game>
        <ng-template #elseGame></ng-template>
  `,
  styles: [`
  `]
})
export class AppComponent {
  home = true;
  pregame = false;
  game = false;

  launchPreGame(): void {
    this.home = false;
    this.pregame = true;
    this.game = false;
  }

  launchGame(): void {
    this.home = false;
    this.pregame = false;
    this.game = true;
  }

  launchHome(): void {
    this.home = true;
    this.pregame = false;
    this.game = false;
  }

}
