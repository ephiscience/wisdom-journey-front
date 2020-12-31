import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <p>
      <button routerLink="/game">Start a Game!</button>
    </p>
  `,
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
