import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, Observable, of, ReplaySubject } from 'rxjs';
import { map, scan, share, switchMap, tap } from 'rxjs/operators';
import { Timer } from 'wisdom-journey-types';
import { TickerService } from './ticker.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements Timer {
  readonly valueChanges: Observable<number>;
  readonly expired: Observable<true>;
  private onStateSet = new ReplaySubject<number>(1);
  private tickers = new BehaviorSubject<Observable<number>>(EMPTY);
  private timerState = 0;

  get state() {
    return this.timerState;
  }

  constructor(private ticker: TickerService) {
    this.valueChanges = merge(
      this.onStateSet.asObservable().pipe(map((value) => ({ kind: 'set', value }))),
      this.tickers.asObservable().pipe(
        switchMap((e) => e),
        map((value) => ({ kind: 'tick', value }))
      )
    ).pipe(
      scan((acc, e) => {
        const { kind, value } = e;

        if (kind === 'tick') {
          return Math.max(0, acc - 1);
        } else {
          return value;
        }
      }, 0),
      tap((v) => (this.timerState = v)),
      share()
    );

    this.expired = this.valueChanges.pipe(
      switchMap((v) => {
        if (v === 0) {
          return of<true>(true);
        } else {
          return EMPTY;
        }
      }),
      share()
    );

    this.expired.subscribe((e) => this.stop());
  }

  start(seconds?: number): void {
    if (seconds) {
      this.onStateSet.next(seconds);
    }

    this.tickers.next(this.ticker.ticks());
  }

  stop(): void {
    this.tickers.next(EMPTY);
  }
}
