import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../board/board.component';

@Component({
  selector: 'app-question',
  template: `
    <div class="outer" *ngIf="question">
      <div class="inner">
        <div class="image"> </div>
        <div class="texts"> 
          <div class="upper-text"> {{ question.text }} </div>
          <div class="lower-text"> {{ question.text }} </div>
        </div>
        <button (click)="nextQuestion()">
          <div class="pause"></div>
        </button>
      </div>
    </div>
  `,
  styles: [`
  :host{
    padding-left:20px;
  }
  div.outer {
    width: 878px;
    height: 130px;
    background: #18485F 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000053;
    border: 1px solid #707070;
    border-radius: 65px;
    position:relative;
  }
  div.inner {
    width: 851px;
    height: 106px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 53px;
    margin-top: 11px;
    margin-left: 14px;
    position: absolute;
    display: flex;
    flex-direction: row; 
    justify-content: center;
    align-items: center;
  }
  div.image{
    width: 74px;
    height: 105px;
    flex-basis: 74px;
    background: transparent url('../assets/images/Inverse_question@2x.png') 0% 0% no-repeat padding-box;
    background-size:contain;
    opacity: 1;
    margin-left: 50px;
  }
  div.texts {
    flex-basis: 720px;
    width: 720px;
    height: 36px;
    padding-bottom:25px;
    padding-right:30px;
  }
  div.upper-text {
    text-align: center;
    font: normal normal bold 27px/32px Roboto;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }
  div.lower-text {
    height: 36px;
    transform: matrix(-1, 0, 0, -1, 0, 0);
    text-align: center;
    font: italic normal bold 24px/28px Roboto;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.58;

  }
  button {
    top:23px;
    left: 825px;
    flex-basis: 60px;
    width: 60px;
    height: 60px;
    background: #B2B2B2 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000053;
    border: 1px solid #000000;
    border-radius: 40px;
    opacity: 1;
    margin-left:0px;
    position:absolute;
    padding-left:15px;
  }
  div.pause {
    width: 30px;
    height: 34px;
    background: transparent url('../assets/images/pause@2x.png') 0% 0% no-repeat padding-box;
    background-size:contain;
  }

  `]
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | null = null;
  @Output() next = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  nextQuestion(): void {
    this.next.emit();
  }
}
