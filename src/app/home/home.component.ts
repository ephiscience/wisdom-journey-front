import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <img src="assets/images/logo@2x.png" alt="ephiscience logo" />
    <button routerLink="/new" i18n>Create a game</button>
    <button class="parameters" (click)="openParameters()"></button>
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
      button.parameters {
        position: fixed;
        bottom: 1%;
        left: 1%;
        width: 56px;
        height: 56px;
        background: transparent url('../../../assets/images/parameters@2x.png') 0 0 no-repeat padding-box;
        background-size: contain;
        border: 0;
        z-index: 100;
        cursor: pointer;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openParameters(): void {
    //ToDo
  }
}
