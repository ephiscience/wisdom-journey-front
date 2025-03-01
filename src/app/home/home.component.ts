import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    template: `
		<img src="assets/images/logo@2x.png" alt="ephiscience logo" />
		<button routerLink="/new" i18n class="newgame">Create a game</button>
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
			button.newgame {
				width: 873px;
				height: 191px;
				/* UI Properties */
				background: transparent radial-gradient(closest-side at 50% 50%, #ffcfa0 0%, #ffa935 100%) 0% 0% no-repeat padding-box;
				border: 2px solid #000000;
				border-radius: 62px;
				opacity: 1;
				text-align: center;
				font: normal normal normal 66px/78px Chela One;
				letter-spacing: 0px;
				color: #000000;
				opacity: 1;
				cursor: pointer;
			}

			img {
				height: 202px;
				width: 650px;
			}
		`,
    ],
    imports: [RouterLink]
})
export class HomeComponent {}
