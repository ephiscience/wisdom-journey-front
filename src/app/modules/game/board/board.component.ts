import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/model/game';

import { QuestionComponent } from '../question/question.component';
import { CriterionCardComponent } from '../criterion-card/criterion-card.component';

@Component({
	selector: 'app-board',
	template: `
		@if (game) {
			<div class="question">
				<app-question [question]="game.remainingQuestions[0]" (next)="game.removeQuestion(); emitCheckGameState()"></app-question>
			</div>
			@if (game.remainingCriterions.length) {
				<div class="criterions">
					@for (c of game.remainingCriterions.slice(0, 3); track c; let i = $index) {
						<app-criterion-card [criterion]="c" [endOfTurn]="this.endOfTurn" (validated)="game.removeCriterion(c, i); emitCheckGameState()">
							{{ c.title }}
						</app-criterion-card>
					}
				</div>
			}
		}
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
	imports: [QuestionComponent, CriterionCardComponent],
})
export class BoardComponent {
	@Input() game!: Game;
	@Input() endOfTurn!: boolean;
	@Output() checkGameState = new EventEmitter();

	emitCheckGameState(): void {
		this.checkGameState.emit();
	}
}
