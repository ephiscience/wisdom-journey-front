import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { LuxonModule } from 'luxon-angular';

const maximumTime = 3 * 60 * 1000;

@Component({
    selector: 'app-timer',
    template: `
		<button (click)="pause()">
			<img *ngIf="paused; else play" src="assets/images/play.png" alt="play button" />
			<ng-template #play>
				<img #play src="assets/images/pause.png" alt="pause button" />
			</ng-template>
		</button>
		<div class="timer">{{ this.time | durationFromMilliseconds | durationToFormat : 'mm:ss' }}</div>
	`,
    styles: [
        `
			:host {
				width: 270px;
				place-self: center;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				height: 62px;
			}

			button {
				width: 62px;
				height: 62px;
				cursor: pointer;
				border-radius: 40px;
				background: #ffbb60 0% 0% no-repeat padding-box;
				border: 4px solid #ffffff;
				//box-shadow: 0px 0px 5px #ffffff;
			}

			div.timer {
				width: 150px;
				height: 62px;
				background: #ffbb60 0% 0% no-repeat padding-box;
				//border: 2px solid #707070;
				border-radius: 20px;
				opacity: 1;
				text-align: center;
				font: normal normal normal 53px/53px Chela One;
				letter-spacing: 0px;
				color: #000000;
			}
			img {
				padding-top: 3px;
				height: 38px;
				width: 33px;
			}
		`,
    ],
    imports: [NgIf, LuxonModule]
})
export class TimerComponent implements OnChanges, OnDestroy {
	@Input() endOfGame!: boolean;
	@Input() modalActive!: boolean;
	@Output() endTimer = new EventEmitter();
	@Output() pausedTimer = new EventEmitter();

	time: number;
	timerID: number | null = null;
	paused = false;

	constructor() {
		this.time = maximumTime;
	}

	ngOnDestroy(): void {
		this.stop();
	}

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
			this.pausedTimer.emit(true);
			this.stop();
		} else {
			this.start();
			this.pausedTimer.emit(false);
		}
	}
}
