import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterion-points',
  template: `
  <p>
      {{'Number of criterions validated:' + NumCriterions}} 
  </p>
  `,
  styles: [
  ]
})
export class CriterionPointsComponent implements OnInit {

  @Input() NumCriterions: number;

  constructor() { }

  ngOnInit(): void {
  }

}
