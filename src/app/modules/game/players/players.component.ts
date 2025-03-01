import { Component, Input } from '@angular/core';
import { Game } from 'src/app/model/game';

@Component({
	selector: 'app-players',
	template: ` <ng-container *ngIf="game">
		<app-player *ngFor="let p of game.players" [player]="p" [orateur]="p.speaking"></app-player>
	</ng-container>`,
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
export class PlayersComponent {
	@Input() game!: Game;
}
