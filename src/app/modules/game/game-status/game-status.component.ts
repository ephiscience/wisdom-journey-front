import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Game } from 'src/app/model/game';
import { TimerComponent } from 'src/app/modules/game/timer/timer.component';
import { NgIf } from '@angular/common';
import { CriterionPointsComponent } from '../criterion-points/criterion-points.component';
import { TimerComponent as TimerComponent_1 } from '../timer/timer.component';
import { QuestionPointsComponent } from '../question-points/question-points.component';

@Component({
    selector: 'app-game-status',
    template: `
		<ng-container *ngIf="game">
			<app-criterion-points [numCriterions]="20 - game.remainingCriterions.length"></app-criterion-points>
			<app-timer
				(endTimer)="emitEndOfGameTurn()"
				(pausedTimer)="emitPausedTimer($event)"
				[endOfGame]="this.reloadTimer"
				[modalActive]="this.pauseTimer"
			></app-timer>
			<app-question-points [questionCount]="game.remainingQuestions.length"></app-question-points>
		</ng-container>
	`,
    styles: [
        `
			:host {
				background: #404040 0% 0% no-repeat padding-box;
				box-shadow: 3px 6px 6px #0000005a;
				opacity: 1;

				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			app-criterion-points {
				flex-basis: 275px;
			}

			timer {
				flex-basis: 100px;
			}

			app-question-points {
				flex-basis: 333px;
			}
		`,
    ],
    imports: [NgIf, CriterionPointsComponent, TimerComponent_1, QuestionPointsComponent]
})
export class GameStatusComponent implements OnChanges {
	@Input() game!: Game;
	@Input() pauseTimer!: boolean;
	@Output() endOfGameTurn = new EventEmitter();
	@Input() reloadTimer!: boolean;
	@Output() pausedTimer = new EventEmitter();

	@ViewChild(TimerComponent) timer!: TimerComponent;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.game && !changes.game.isFirstChange()) {
			this.timer.reset();
		}
	}

	emitEndOfGameTurn(): void {
		this.endOfGameTurn.emit();
	}

	emitPausedTimer(state: boolean): void {
		this.pausedTimer.emit(state);
	}
}
