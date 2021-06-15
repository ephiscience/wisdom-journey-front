import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Criterion } from 'src/app/modules/game/board/board.component';

/* [ngStyle]="{'backgroundColor': check1 ? '#1B8CD0 0% 0% no-repeat padding-box' : '#FFA935 0% 0% no-repeat padding-box'}"*/

@Component({
  selector: 'app-criterion-card',
  template: `
    <div class="outer" *ngIf="criterion">
      <div class="inner">
        <div
          [ngClass]="{
            'text-upper-short': criterion.text.length < 10,
            'text-upper-long': criterion.text.length >= 10
          }"
        >
          {{ criterion.text }}
        </div>
        <div
          [ngClass]="{
            'text-left-short': criterion.description.length <= 22,
            'text-left-long': criterion.description.length > 22
          }"
        >
          {{ criterion.description }}
        </div>
        <div
          [ngClass]="{
            'text-right-short': criterion.description.length <= 22,
            'text-right-long': criterion.description.length > 22
          }"
        >
          {{ criterion.description }}
        </div>
        <div
          [ngClass]="{
            'text-lower-short': criterion.text.length < 10,
            'text-lower-long': criterion.text.length >= 10
          }"
        >
          {{ criterion.text }}
        </div>
        <div class="image">
          <img class="icon" src="{{ '../assets/images/' + criterion.icon }}" alt="criterion icon" />
        </div>
        <button
          class="upper"
          (click)="check1 = !check1"
          (click)="buttonClicked()"
          [ngStyle]="{ background: check1 ? '#FFA935 0% 0% no-repeat padding-box' : '#1B8CD0 0% 0% no-repeat padding-box' }"
        >
          <div class="inner-button"></div>
          <div class="check"></div>
        </button>
        <button
          class="lower"
          (click)="check2 = !check2"
          (click)="buttonClicked()"
          [ngStyle]="{ background: check2 ? '#FFA935 0% 0% no-repeat padding-box' : '#1B8CD0 0% 0% no-repeat padding-box' }"
        >
          <div class="inner-button"></div>
          <div class="check"></div>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .outer {
        width: 162px;
        height: 231px;
        background: #9db749 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 3px #00000050;
        border: 1px solid #707070;
        border-radius: 5px;
        position: relative;
        margin-left: 20px;
        margin-right: 20px;
      }

      .inner {
        top: 7px;
        left: 8px;
        width: 144px;
        height: 215px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #fffeff;
        border-radius: 14px;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      button {
        width: 52px;
        height: 52px;
        background: #1b8cd0 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 10px #ffffff;
        border: 2px solid #000000;
        border-radius: 40px;
        position: absolute;
        cursor: pointer;
      }

      button.upper {
        top: -23px;
        left: 120px;
      }

      button.lower {
        top: 185px;
        left: -30px;
      }

      .image {
        position: absolute;
        top: 55px;
        left: 22px;
        width: 99px;
        height: 95px;
        background: transparent url('../../../../assets/images/etoileCritere@2x.png') 0% 0% no-repeat padding-box;
        opacity: 1;
      }

      .text-upper-short {
        top: 5px;
        left: 0px;
        width: 144px;
        text-align: center;
        font: normal normal normal 27px/31px Chela One;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        overflow-wrap: break-word;
        position: absolute;
      }

      .text-upper-long {
        top: 5px;
        left: 0px;
        width: 144px;
        text-align: center;
        font: normal normal normal 24px/27px Chela One;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        overflow-wrap: break-word;
        position: absolute;
      }

      .text-lower-short {
        top: 182px;
        left: 0px;
        width: 144px;
        transform: matrix(-1, 0, 0, -1, 0, 0);
        text-align: center;
        font: normal normal normal 27px/31px Chela One;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        overflow-wrap: break-word;
        position: absolute;
      }

      .text-lower-long {
        bottom: 2px;
        left: 0px;
        width: 144px;
        transform: matrix(-1, 0, 0, -1, 0, 0);
        text-align: center;
        font: normal normal normal 24px/27px Chela One;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        overflow-wrap: break-word;
        position: absolute;
      }

      .text-left-short {
        top: 92px;
        left: -94px;
        width: 217px;
        height: 30px;
        transform: matrix(0, -1, 1, 0, 0, 0);
        text-align: center;
        font: normal normal normal 16px/19px Roboto;
        letter-spacing: 0px;
        color: #000000;
        position: absolute;
        z-index: 2;
      }

      .text-left-long {
        top: 98px;
        left: -73px;
        width: 180px;
        height: 30px;
        transform: matrix(0, -1, 1, 0, 0, 0);
        text-align: center;
        font: normal normal normal 15px/15px Roboto;
        letter-spacing: 0px;
        padding-left: 20px;
        color: #000000;
        position: absolute;
        z-index: 2;
      }

      .text-right-short {
        top: 90px;
        left: 17px;
        width: 217px;
        height: 30px;
        transform: matrix(0, 1, -1, 0, 0, 0);
        /* UI Properties */
        text-align: center;
        font: normal normal normal 16px/19px Roboto;
        letter-spacing: 0px;
        color: #000000;
        position: absolute;
        z-index: 2;
      }

      .text-right-long {
        top: 86px;
        left: 35px;
        width: 180px;
        height: 30px;
        transform: matrix(0, 1, -1, 0, 0, 0);
        /* UI Properties */
        text-align: center;
        font: normal normal normal 15px/15px Roboto;
        letter-spacing: 0px;
        padding-left: 20px;
        color: #000000;
        position: absolute;
        z-index: 2;
      }

      .icon {
        top: 10px;
        left: 4px;
        max-width: 89px;
        max-height: 85px;
        z-index: 2;
        position: absolute;
      }

      .inner-button {
        top: 5px;
        left: 5px;
        width: 38px;
        height: 38px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #707070;
        border-radius: 30px;
        position: absolute;
      }

      .check {
        top: 15px;
        left: 10px;
        width: 30px;
        height: 22px;
        background: transparent url('../../../../assets/images/check@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        z-index: 2;
        position: absolute;
      }
    `,
  ],
})
export class CriterionCardComponent implements OnInit, OnChanges {
  @Input() criterion?: Criterion;
  @Input() endOfTurn!: boolean;
  @Output() validated = new EventEmitter<boolean>();
  check1 = false;
  check2 = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.endOfTurn === true) {
      this.check1 = false;
      this.check2 = false;
    }
  }

  getIcon(path: string): string {
    const thePath = `transparent url('../assets/images/${path}') 0% 0% no-repeat padding-box`;
    return thePath;
  }

  async buttonClicked(): Promise<void> {
    await delay(350);
    if (this.check1 && this.check2) {
      this.validated.emit(this.check1 && this.check2);
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
