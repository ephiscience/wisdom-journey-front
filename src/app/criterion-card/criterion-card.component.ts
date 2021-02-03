import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from '../board/board.component';

/* {{criterion.text}}*/
@Component({
  selector: 'app-criterion-card',
  template: `
    <div class="outer" *ngIf="criterion">
      <div class="inner">
        <div class="text-upper"> {{criterion.text}} </div>
        <div class="text-left"> Par Exemple ? </div>
        <div class="text-right"> Par exemple ? </div>
        <div class="text-lower"> {{criterion.text}} </div>
        <div class="image">
         <div class="icon"></div>
        </div>
        <button class="upper" (click)="check1 = true" (click)="buttonClicked()">
          <div class="inner-button"></div>
          <div class="check"></div>
        </button>
        <button class="lower" (click)="check2 = true" (click)="buttonClicked()">
          <div class="inner-button"></div>
          <div class="check"></div>
        </button>
      </div>
    </div>
  `,
  styles: [`
  div.outer{
    width: 162px;
    height: 231px;
    background: #9DB749 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000050;
    border: 1px solid #707070;
    border-radius: 5px;
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
  }
  div.inner {
    top:7px;
    left:8px;
    width: 144px;
    height: 215px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #FFFEFF;
    border-radius: 14px;
    position: absolute;
    display: flex;
    flex-direction: column ;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 52px;
    height: 52px;
    background: #1B8CD0 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 10px #FFFFFF;
    border: 2px solid #000000;
    border-radius: 40px;
    position: absolute;
  }
  button.upper {
    top:-23px;
    left:120px;
  }
  button.lower {
    top:185px;
    left:-30px;
  }
  div.image {
    position: absolute;
    top: 55px;
    left: 22px;
    width: 99px;
    height: 95px;
    background: transparent url('../assets/images/etoileCritere@2x.png') 0% 0% no-repeat padding-box;
    opacity: 1;
  }
  div.text-upper{
    top: 5px;
    left: 0px;
    width: 144px;
    text-align: center;
    font: normal normal normal 27px/31px Chela One;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    position: absolute;
  }
  div.text-lower {
    top: 182px;
    left:0px;
    width: 144px;
    transform: matrix(-1, 0, 0, -1, 0, 0);
    text-align: center;
    font: normal normal normal 27px/31px Chela One;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    position: absolute;
  }
  div.text-left {
    top: 92px;
    left: -90px;
    width: 217px;
    height: 30px;
    transform: matrix(0, -1, 1, 0, 0, 0);
    text-align: center;
    font: normal normal normal 16px/19px Roboto;
    letter-spacing: 0px;
    color: #000000;
    position: absolute;
    z-index:2;
  }
  div.text-right {
    top: 92px;
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
    z-index:2;
  }
  div.icon {
    top: 18px;
    left: 20px;
    width: 75px;
    height: 75px;
    background: transparent url('../assets/images/verify@2x.png') 0% 0% no-repeat padding-box;
    background-size:contain;
    z-index:2;
    position: absolute;
  }
  div.inner-button {
    top:4px;
    left:4px;
    width: 38px;
    height: 38px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #707070;
    border-radius: 30px;
    position: absolute;
  }
  div.check {
    top:15px;
    left:10px;
    width:30px;
    height:22px;
    background: transparent url('../assets/images/check@2x.png') 0% 0% no-repeat padding-box;
    background-size:contain;
    z-index:2;
    position: absolute;

  }
  `

  ]
})

export class CriterionCardComponent implements OnInit {
  @Input() criterion?: Criterion;
  @Output() validated = new EventEmitter<boolean>();
  check1 = false;
  check2 = false;

  constructor() { }

  ngOnInit(): void { }

  buttonClicked(): void {
    if (this.check1 && this.check2) {
      this.validated.emit(this.check1 && this.check2);
    }
  }
}
