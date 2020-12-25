import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Game} from '../game/game.component';

function shuffle(array: any) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

@Component({
  selector: 'app-players',
  template: `
    <div>
      <app-player *ngFor="let p of game.players;index as i" [player]=p [orateur]="roles[i]" (shuffleRoles)="shuffleRoles()"></app-player>
    </div>
  `,
  styles: [
  ]
})
export class PlayersComponent implements OnInit, OnChanges{
  @Input() game! :Game
  @Input() shuffles! : boolean
  roles!: boolean[]

  constructor() {}

  ngOnInit(): void {
    this.assignRoles()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shuffles']) {
      this.shuffleRoles();  }
    
}

  assignRoles(){
    var i;
    this.roles = [true, true];
    for (i =0; i< this.game.players.length -2; i++){
      this.roles.push(false)
    }
    this.roles= shuffle(this.roles)

  }

  shuffleRoles(){
    console.log("roles changed");
    this.roles= shuffle(this.roles);
  }

}
