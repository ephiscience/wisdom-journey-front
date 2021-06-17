import { Observable } from 'rxjs';

export interface Timer {
  readonly valueChanges: Observable<number>;

  readonly expired: Observable<true>;

  readonly state: number;

  start(seconds?: number): void;

  stop(): void;
}

export interface Ticker {
  ticks(): Observable<number>;

  start(): void;

  stop(): void;
}
