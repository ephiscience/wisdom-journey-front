import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from 'src/app/modules/pregame/player-selection/player-selection.component';
import { QuitGameConfirmationModalComponent } from 'src/app/modules/shared/quit-game-confirmation-modal/quit-game-confirmation-modal.component';
import { CurrentGameService } from 'src/app/services/current-game.service';

@Component({
	selector: 'app-pregame',
	template: `
		<div class="container">
			<app-player-selection *ngIf="!this.level" (numPlayers)="loadLevelSelection($event)"></app-player-selection>
			<app-level-selection *ngIf="this.level" [playerNames]="this.playerNames"></app-level-selection>
			<button class="home" (click)="openQuitGameModal()"> </button>
		</div>
	`,
	styles: [
		`
			div.container {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				height: 100vh;
			}

			button.home {
				position: fixed;
				bottom: 1%;
				right: 1%;
				width: 56px;
				height: 56px;
				background: transparent url('src/assets/images/home@2x.png') 0% 0% no-repeat padding-box;
				background-size: contain;
				border: 0;
				cursor: pointer;
			}
		`,
	],
})
export class PregameComponent {
	level = false;
	playerNames!: string[];

	constructor(private cg: CurrentGameService, private router: Router, private modalService: NgbModal) {}

	openQuitGameModal(): void {
		this.handleQuitGameModalResult(this.modalService.open(QuitGameConfirmationModalComponent, { backdrop: 'static' }).result);
	}

	handleQuitGameModalResult(p: Promise<unknown>) {
		p.then(() => this.router.navigate(['/'])).catch((e) => console.error(e));
	}

	loadLevelSelection(players: Player[]): void {
		this.playerNames = players.map((p) => p.name);
		this.level = true;
	}
}
