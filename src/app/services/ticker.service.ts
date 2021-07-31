import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, Observable } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { Ticker } from 'wisdom-journey-types';

@Injectable({
  providedIn: 'root',
})
export class TickerService implements Ticker {
  private readonly observable: Observable<number>;
  private sources = new BehaviorSubject<Observable<number>>(EMPTY);

  constructor() {
    this.observable = this.sources.pipe(
      switchMap((e) => e),
      scan((acc) => acc + 1, 0),
      share()
    );
  }

  start(): void {
    this.sources.next(interval(1000));
  }

  stop(): void {
    this.sources.next(EMPTY);
  }

  ticks(): Observable<number> {
    return this.observable;
  }
}
