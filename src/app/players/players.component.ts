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
  styles: []
})
export class PlayersComponent implements OnInit {
  @Input() game!: Game;

  constructor() {}

  ngOnInit(): void {}
}
