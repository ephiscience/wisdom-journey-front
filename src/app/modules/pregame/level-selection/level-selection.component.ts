import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from 'src/app/services/current-game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissingLevelSelectionModalComponent } from '../missing-level-selection-modal/missing-level-selection-modal.component';
import { NgFor } from '@angular/common';
import { DifficultyCardComponent } from '../difficulty-card/difficulty-card.component';

export interface LevelData {
	readonly backgroundColor: string;
	readonly cardCount: number;
	readonly icon: string;
	readonly title: string;
}

const LEVELS: LevelData[] = [
	{
		title: $localize`Beginner`,
		icon: 'debutant.png',
		backgroundColor: '#E4F4B2',
		cardCount: 8,
	},
	{
		title: $localize`Intermediate`,
		icon: 'intermediaire.png',
		backgroundColor: '#FFF0BF',
		cardCount: 6,
	},
	{
		title: $localize`Advanced`,
		icon: 'avance.png',
		backgroundColor: '#FFD4BC',
		cardCount: 4,
	},
	{
		title: $localize`Expert`,
		icon: 'expert.png',
		backgroundColor: '#FFC5BC',
		cardCount: 3,
	},
];

@Component({
    selector: 'app-level-selection',
    template: `
		<div class="texte">
			2/2 -
			<ng-container i18n>Select the difficulty</ng-container>
		</div>
		<div class="container">
			<app-difficulty-card
				*ngFor="let item of levels"
				[item]="item"
				[selected]="item === clickedButton"
				(clicked)="levelSelection(item)"
			></app-difficulty-card>
		</div>
		<button class="play" (click)="loadGame()" i18n="play button|Button to launch the game">Play</button>
	`,
    styles: [
        `
			:host {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				height: 100vh;
			}

			div.texte {
				width: 100vw;
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

			button.play {
				width: 567px;
				height: 114px;
				background: #ffa935 0% 0% no-repeat padding-box;
				box-shadow: 3px 3px 3px #0000005f;
				border: 3px solid #707070;
				border-radius: 74px;
				text-align: center;
				font: normal normal normal 70px/82px Chela One;
				letter-spacing: 0px;
				cursor: pointer;
			}
		`,
    ],
    imports: [NgFor, DifficultyCardComponent]
})
export class LevelSelectionComponent {
	@Input() playerNames!: string[];

	maxQuestions = 0;
	levels = LEVELS;

	clickedButton?: LevelData;

	constructor(private cg: CurrentGameService, private router: Router, private modalService: NgbModal) {}

	levelSelection(level: LevelData) {
		this.clickedButton = level;
		this.maxQuestions = level.cardCount;
	}

	loadGame(): void {
		console.log(this.playerNames);
		console.log(this.maxQuestions);

		if (this.maxQuestions === 0) {
			this.openMissingLevelSelectionModal();
		} else {
			this.cg.createGame(this.maxQuestions, this.playerNames);
			this.router.navigate(['game']);
		}
	}

	openMissingLevelSelectionModal(): void {
		this.modalService.open(MissingLevelSelectionModalComponent, { backdrop: 'static' });
	}
}
