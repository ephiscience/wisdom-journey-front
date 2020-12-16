import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-board></app-board>
  `,
  styles: [`
    h1 {
      color: red;
    }
  `]
})
export class AppComponent {
  title = 'The new sefsefapp';
}
