import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <img src="../assets/images/logo@2x.png" alt="ephiscience logo">
      <button (click)="preGame()"> Jouer </button>
  `,
  styles: [`
:host {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}
  button {
  width: 873px;
  height: 191px;
  /* UI Properties */
  background: transparent radial-gradient(closest-side at 50% 50%, #FFCFA0 0%, #FFA935 100%) 0% 0% no-repeat padding-box;
  border: 2px solid #000000;
  border-radius: 62px;
  opacity: 1;
  text-align: center;
  font: normal normal normal 66px/78px Chela One;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
img {
  height: 202px;
  width: 650px;
}
  `]
})

export class HomeComponent implements OnInit {
  @Output() pregame = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  preGame(): void {
    this.pregame.emit();
  }

}
