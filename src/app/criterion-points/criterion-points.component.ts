import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterion-points',
  template: `
    <p>
      {{'Number of criterions validated:' + numCriterions}}
    </p>
  `,
  styles: []
})
export class CriterionPointsComponent implements OnInit {
  @Input() numCriterions!: number;

  constructor() {}

  ngOnInit(): void {}
}
