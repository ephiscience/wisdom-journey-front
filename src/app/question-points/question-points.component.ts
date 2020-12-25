import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-points',
  template: `
    <div>
    {{'Number of questions remaining:' + numQuestions}} 
    </div>
  `,
  styles: [
  ]
})
export class QuestionPointsComponent implements OnInit {
  @Input() numQuestions!: Number;

  constructor() {}  

  ngOnInit(): void {
  }

}
