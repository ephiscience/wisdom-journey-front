import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

const maximumTime = 10000;



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

export class TimerComponent implements OnInit, OnChanges {
  @Output() endTimer = new EventEmitter();
  time: number;
  timerID!: any; // Fix error with NodeJS.Timeout at some point
  paused = false;
  @Input() endOfGame!: boolean; 

  constructor() { this.time = maximumTime;  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.timerID = setInterval( () => this.countdown(), 1000);
  }

  ngOnChanges(): void {
    this.time = maximumTime + 1000;
  }

  countdown(): void {
    this.time = this.time - 1000;
    if (this.time === -1000) {
      window.clearInterval(this.timerID);
      this.time = maximumTime + 1000;
      this.startTimer();
      this.endTimer.emit();
    }
  }

  pause(): void {
    if (this.paused === false) {
      this.paused = !this.paused;
      window.clearInterval(this.timerID);
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
