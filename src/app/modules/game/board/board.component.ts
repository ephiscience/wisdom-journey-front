import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/model/game';
import { NgIf, NgFor } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { CriterionCardComponent } from '../criterion-card/criterion-card.component';

@Component({
    selector: 'app-board',
    template: `
		<ng-container *ngIf="game">
			<div class="question">
				<app-question [question]="game.remainingQuestions[0]" (next)="game.removeQuestion(); emitCheckGameState()"></app-question>
			</div>

			<div class="criterions" *ngIf="game.remainingCriterions.length">
				<app-criterion-card
					*ngFor="let c of game.remainingCriterions.slice(0, 3); index as i"
					[criterion]="c"
					[endOfTurn]="this.endOfTurn"
					(validated)="game.removeCriterion(c, i); emitCheckGameState()"
				>
					{{ c.title }}
				</app-criterion-card>
			</div>
		</ng-container>
	`,
    styles: [
        `
			:host {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			div.question {
				flex-basis: 130px;
				margin-bottom: 50px;
			}

			div.criterions {
				flex-basis: 162px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}

			app-criterion-card {
				flex-basis: 162px;
			}
		`,
    ],
    imports: [NgIf, QuestionComponent, NgFor, CriterionCardComponent]
})
export class BoardComponent {
	@Input() game!: Game;
	@Input() endOfTurn!: boolean;
	@Output() checkGameState = new EventEmitter();

	emitCheckGameState(): void {
		this.checkGameState.emit();
	}
}
