import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../board/board.component'

@Component({
  selector: 'app-question',
  template: `
    <p *ngIf="question">
      La question est: {{ question.text }}
    </p>
  `,
  styles: [
  ]
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | null = null
  @Input() reversed: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
