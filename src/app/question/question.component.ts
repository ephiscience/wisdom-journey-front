import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../board/board.component';

@Component({
  selector: 'app-question',
  template: `
    <p *ngIf="question">
      La question est: {{ question.text }}
      <button (click)="nextQuestion()">Next</button>
    </p>
  `,
  styles: [
  ]
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | null = null;
  @Output() next = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  nextQuestion(): void{
    this.next.emit();
  }

}
