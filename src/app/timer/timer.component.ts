import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

const maximumTime = 10000;

@Component({
  selector: 'app-timer',
  template: `
    <p>
      <button (click)="pause()">{{ millisToMinutesAndSeconds() }}</button>
    </p>
  `,

  styles: [
    `
      :host {
        place-self: center;
      }

      button {
        width: 161px;
        height: 64px;
        background: #ffbb60 0% 0% no-repeat padding-box;
        border: 4px solid #ffffff;
        border-radius: 40px;
        opacity: 1;
        text-align: center;
        font: normal normal normal 53px/53px Chela One;
        letter-spacing: 0px;
        color: #000000;
        cursor: pointer;
      }
    `,
  ],
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() endOfGame!: boolean;
  @Input() modalActive!: boolean;
  @Output() endTimer = new EventEmitter();

  time: number;
  timerID: number | null = null;
  paused = false;

  constructor() {
    this.time = maximumTime;
  }

  ngOnDestroy(): void {
    this.stop();
  }

  ngOnInit(): void {}

  start(): void {
    if (this.timerID === null) {
      this.timerID = window.setInterval(() => this.countdown(), 1000);
      this.paused = false;
    }
  }

  reset() {
    this.stop();
    this.time = maximumTime + 1000;
    this.start();
  }

  stop() {
    if (this.timerID !== null) {
      window.clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  ngOnChanges(): void {
    if (this.modalActive) {
      this.stop();
    } else {
      this.start();
    }

    if (this.endOfGame) {
      this.time = maximumTime + 1000;
    }
  }

  countdown(): void {
    this.time = this.time - 1000;
    if (this.time === -1000) {
      this.reset();

      this.endTimer.emit();
    }
  }

  pause(): void {
    if (this.paused === false) {
      this.paused = true;
      this.stop();
    } else {
      this.start();
    }
  }

  millisToMinutesAndSeconds(): string {
    const minutes = Math.floor(this.time / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    return seconds === 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}
