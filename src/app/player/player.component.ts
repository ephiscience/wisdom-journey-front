import { Component, OnInit, Input } from '@angular/core';
import { Player} from '../game/game.component';

@Component({
  selector: 'app-player',
  template: `
    <div>
      {{ player.name }} | orateur {{ orateur}}
    </div>
  `,
  styles: [
  ]
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player
  @Input() orateur: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
