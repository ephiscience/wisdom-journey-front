import { Observable } from 'rxjs';

export interface Timer {
  readonly valueChanges: Observable<number>;

  start(seconds?: number): void;

  stop(): void;

  expired(): Observable<boolean>;
}

export interface Ticker {
  ticks(): Observable<number>;

  start(): void;

  stop(): void;
}
