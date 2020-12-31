import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Title: {{ title }} </h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Expédition Sagesse';
}
