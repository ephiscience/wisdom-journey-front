import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

const maximumTime = 60000;



@Component({
  selector: 'app-timer',
  template: `
    <p>
      <button (click)="pause()">{{millisToMinutesAndSeconds()}} </button>
    </p>
  `,

  styles: [`

  :host {
    place-self: center;
  }

  button {
    width: 161px;
    height: 64px;
    background: #FFBB60 0% 0% no-repeat padding-box;
    border: 4px solid #FFFFFF;
    border-radius: 40px;
    opacity: 1;
    text-align: center;
    font: normal normal normal 53px/53px Chela One;
    letter-spacing: 0px;
    color: #000000;
  }
  `]
})

export class TimerComponent implements OnInit {
  @Output() additionalCriteria = new EventEmitter<boolean>();
  @Output() nextQuestion = new EventEmitter();
  @Output() shuffleRoles = new EventEmitter();
  @Output() checkVictory = new EventEmitter();
  time: number;
  timerID!: any; // Fix error with NodeJS.Timeout at some point
  paused = false;
  //@Input() EndOfGame: boolean; ?

  constructor() { this.time = maximumTime;  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.timerID = setInterval( () => this.countdown(), 1000);
  }

  countdown(): void{
    this.time = this.time - 1000;
    if (this.time === -1000){
      //console.log(this.time);
      window.clearTimeout(this.timerID);
      this.time = maximumTime;
      const answer = confirm('do you validate them criterias ?');
      //console.log(answer);
      if (answer === true) {
        this.additionalCriteria.emit(answer);
        this.checkVictory.emit();
      }
      this.nextQuestion.emit();
      this.shuffleRoles.emit();
      this.startTimer();
    }
  }

  pause(): void {
    if (this.paused === false) {
      this.paused = !this.paused;
      window.clearTimeout(this.timerID);
    } else {
      this.paused = !this.paused;
      this.startTimer();
    }
  }

  millisToMinutesAndSeconds(): string {
    const minutes = Math.floor(this.time / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    return (seconds === 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }

}
