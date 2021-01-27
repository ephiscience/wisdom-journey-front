import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../game/game.component';

@Component({
  selector: 'app-players',
  template: `
    <div>
      <app-player *ngFor="let p of game.players"
                  [player]="p"
                  [orateur]="p.speaking">
      </app-player>
    </div>
  `,
  styles: [`
    :host {
      display: block-inline;
      grid-column-start: 1;
    grid-column-end: 11;
    grid-row-start: 7;
    grid-row-end: 9;
    }
    `]
})
export class PlayersComponent implements OnInit {
  @Input() game!: Game;

  constructor() {}

  ngOnInit(): void {}
}
