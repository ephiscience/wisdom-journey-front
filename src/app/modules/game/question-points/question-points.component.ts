import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';

@Component({
    selector: 'app-question-points',
    template: ` <div class="image" *ngFor="let item of questionCount | times"></div> `,
    styles: [
        `
			:host {
				width: 333px;
				height: 60px;
				place-self: center;
				margin-right: 30px;
				padding-right: 5px;
				background: #ffffff 0% 0% no-repeat padding-box;
				border: 1px solid #404040;
				border-radius: 12px;
				opacity: 1;
				display: inline-flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
			}

			div.image {
				width: 33px;
				height: 47px;
				background: transparent url('src/assets/images/Inverse_question@2x.png') 0% 0% no-repeat padding-box;
				background-size: contain;
				opacity: 1;
				margin: 2px;
			}
		`,
    ],
    imports: [NgFor, TimesPipe]
})
export class QuestionPointsComponent {
	@Input() questionCount!: number;
}
