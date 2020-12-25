import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from '../board/board.component';

@Component({
  selector: 'app-criterion-card',
  template: `
    <div *ngIf="criterion">
      {{ criterion.text }}
      <button (click)="check1 = true" (click)="buttonClicked()">Check 1</button>
      <button (click)="check2 = true" (click)="buttonClicked()">Check 2</button>
    </div>
  `,
  styles: []
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
