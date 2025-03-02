import { Component, Input } from '@angular/core';
import { Game } from 'src/app/model/game';
import { NgIf, NgFor } from '@angular/common';
import { PlayerComponent } from '../player/player.component';

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
    imports: [NgIf, NgFor, PlayerComponent]
})
export class PlayersComponent {
	@Input() game!: Game;
}
