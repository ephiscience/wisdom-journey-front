import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterion-points',
  template: `
    <div class="image"></div>
    <div class="bar-container">
      <div class="text">{{ numCriterions + '/20' }}</div>
      <div class="bar" [class.transparent]="this.numCriterions === 0" [style.width]="getWidth()"></div>
    </div>
  `,
  styles: [
    `
      :host {
        margin-left: 30px;
        place-self: center;
        width: 275px;
        height: 60px;

        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #404040;
        border-radius: 15px;
        opacity: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      div.image {
        flex-basis: 42px;
        width: 42px;
        height: 41px;
        background: transparent url('../../../../assets/images/noun_Star_1015739.png') 0% 0% no-repeat padding-box;
        opacity: 1;
      }

      div.bar-container {
        flex-basis: 200px;
        width: 196px;
        height: 30px;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 3px #00000031;
        border: 2px solid #707070;
        border-radius: 16px;
        opacity: 1;
        margin-left: 8px;
        position: relative;
      }

      div.text {
        text-align: center;
        font: normal normal normal 25px/30px Chela One;
        letter-spacing: 0px;
        color: #000000;
        z-index: 10;
        position: absolute;
        margin-left: 75px;
      }

      div.bar {
        top: -2px;
        left: -2px;
        height: 30px;
        width: 0%;
        background: transparent radial-gradient(closest-side at 51% 32%, #e4f4b2 0%, #d3f074 2%, #acc655 46%, #9db749 100%) 0% 0% no-repeat
          padding-box;
        border: 2px solid #707070;
        border-radius: 21px;
        opacity: 1;
        position: absolute;
      }

      .bar.transparent {
        opacity: 0;
      }
    `,
  ],
})
export class CriterionPointsComponent implements OnInit {
  @Input() numCriterions!: number;

  constructor() {}

  ngOnInit(): void {}

  getWidth(): string {
    return (this.numCriterions / 20) * 100 + '%';
  }
}
