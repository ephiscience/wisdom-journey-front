import { Component, OnInit, Output, EventEmitter} from '@angular/core';

const maximumTime: number = 10000;


@Component({
  selector: 'app-timer',
  template: `
    <p>
    <button (click)="pause()"> Time {{millisToMinutesAndSeconds()}} </button>
    </p>
  `,
  styles: [
  ]
})
export class TimerComponent implements OnInit {
  time: number
  timerID!: any //Fix error with NodeJS.Timeout at some point
  paused: boolean = false
  @Output() additionalCriteria = new EventEmitter<boolean>()
  @Output() nextQuestion = new EventEmitter()
  @Output() shuffleRoles = new EventEmitter()
  /* @Input() endofgame -> stops timer*/ 

  constructor() { this.time = maximumTime}

  ngOnInit():void {
    this.startTimer() 
  }

  startTimer() {
    this.timerID = setInterval( ()=> this.countdown(), 1000);
  }

  countdown(){
    this.time = this.time - 1000;
    if (this.time == -1000){
      console.log(this.time);
      window.clearTimeout(this.timerID); 
      this.time = maximumTime; 
      let answer = confirm("do you validate them criterias ?");
      console.log(answer);
      if (answer == true) {
        this.additionalCriteria.emit(answer);
      }
      this.nextQuestion.emit();
      this.shuffleRoles.emit();
      this.startTimer();
    }
  }

  pause() {
    if (this.paused == false) {
      this.paused = !this.paused;
      window.clearTimeout(this.timerID);
    } else {
      this.paused = !this.paused;
      this.startTimer()
    }
  }

  millisToMinutesAndSeconds() {
    var minutes = Math.floor(this.time / 60000);
    var seconds = Math.floor((this.time % 60000) / 1000);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }

}
