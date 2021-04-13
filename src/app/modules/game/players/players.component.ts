import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game.model';

@Component({
  selector: 'app-players',
  template: ` <app-player *ngFor="let p of game.players" [player]="p" [orateur]="p.speaking"> </app-player> `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
      }
    `,
  ],
})
export class PlayersComponent implements OnInit {
  @Input() game!: Game;

  constructor() {}

  ngOnInit(): void {}
}
