import { Injectable } from '@angular/core';
import { EMPTY, interval, Observable, of } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { Ticker } from '../../../lib/wisdom-journey-types/src';

@Injectable({
  providedIn: 'root',
})
export class TickerService implements Ticker {
  private readonly observable: Observable<number>;
  private paused = true;

  constructor() {
    this.observable = interval(1000).pipe(
      switchMap((e) => {
        if (this.paused) {
          return EMPTY;
        } else {
          return of(e);
        }
      }),
      scan((acc) => acc + 1, 0),
      share()
    );
  }

  start(): void {
    this.paused = false;
  }

  stop(): void {
    this.paused = true;
  }

  ticks(): Observable<number> {
    return this.observable;
  }
}
