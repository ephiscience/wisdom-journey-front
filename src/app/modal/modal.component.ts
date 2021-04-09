import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="background">
      <div class="body">
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}</div>
        <div class="buttons">
          <button class="no" (click)="emitNo()">Non</button>
          <button class="yes" (click)="emitYes()">Oui</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      div.background {
        position: absolute;
        top: 0px;
        left: Opx;
        width: 100%;
        height: 100%;
        /* UI Properties */
        background: #00000080 0% 0% no-repeat padding-box;
        opacity: 1;
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      div.body {
        position: fixed;
        width: 479px;
        height: 331px;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 10px #000000;
        border: 2px solid #000000;
        border-radius: 56px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
      div.title {
        text-align: center;
        font: normal normal normal 60px/71px Chela One;
        letter-spacing: 0px;
        color: #000000;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      div.content {
        text-align: center;
        font: normal normal normal 33px/39px Roboto;
        color: #000000;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      div.buttons {
        width: 370px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
      button.no {
        width: 141px;
        height: 66px;
        background: #ed6760 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #707070;
        border-radius: 33px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
      }
      button.yes {
        width: 141px;
        height: 66px;
        background: #9db749 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #707070;
        border-radius: 33px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
      }
    `,
  ],
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;
  @Output() answer = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  emitNo(): void {
    this.answer.emit(false);
  }

  emitYes(): void {
    this.answer.emit(true);
  }
}
