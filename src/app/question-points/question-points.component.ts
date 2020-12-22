import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-points',
  template: `
    <div>
    {{'Number of questions remaining:' + NumQuestions}} 
    </div>
  `,
  styles: [
  ]
})
export class QuestionPointsComponent implements OnInit {
  @Input() NumQuestions: Number;

  constructor() {this.NumQuestions = 0} // should I initialize it ? 

  ngOnInit(): void {
  }

}
