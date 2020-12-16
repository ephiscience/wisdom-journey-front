import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from '../board/board.component'
@Component({
  selector: 'app-criterion-card',
  template: `
    <div *ngIf="criterion">
      {{ criterion.text }}
      <button (click)="buttonClicked()">Valider</button>
    </div>
  `,
  styles: [
  ]
})
export class CriterionCardComponent implements OnInit {
  @Input() criterion?: Criterion
  @Output() validated = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(){
    this.validated.emit()
  }

}
