import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Title: {{ title }} </h1>
  <app-game>  </app-game>
  `,
  styles: [`
    h1 {
      color: red;
    }
  `]
})
export class AppComponent {
  title = 'The game';
}
