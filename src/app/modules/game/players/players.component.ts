import { Component, Input } from '@angular/core';
import { Game } from 'src/app/model/game';

import { PlayerComponent } from '../player/player.component';

@Component({
	selector: 'app-players',
	template: ` @if (game) {
		@for (p of game.players; track p) {
			<app-player [player]="p" [orateur]="p.speaking"></app-player>
		}
	}`,
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
	imports: [PlayerComponent],
})
export class PlayersComponent {
	@Input() game!: Game;
}
