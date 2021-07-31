import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Ticker } from 'wisdom-journey-types';
import { TickerService } from './ticker.service';
import { TimerService } from './timer.service';

describe('TimerService', () => {
  let timer: TimerService;
  let ticker: Ticker;
  let tickStream: Subject<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tickStream = new Subject();
    ticker = TestBed.inject(TickerService);
    spyOn(ticker, 'ticks').and.returnValue(tickStream.asObservable());
    timer = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(timer).toBeTruthy();
    expect(timer.state).toBe(0);
    expect(timer.valueChanges).toBeTruthy();
    expect(timer.expired).toBeTruthy();
  });

  it('sets the state of the timer to the provided value to start', () => {
    spyOn(ticker, 'start').and.returnValue(undefined);

    timer.start(42);
    expect(timer.state).toBe(42);
  });

  it('emits a new value through valueChange when start is given a value', () => {
    let value = -1;
    const sub = timer.valueChanges.subscribe((e) => (value = e));
    expect(value).toBe(-1);
    timer.start(42);
    expect(value).toBe(42);
    tickStream.next(1);
    expect(value).toBe(41);

    sub.unsubscribe();
  });

  it('emits true on expired when a tick change its state to 0', () => {
    let value = false;
    const sub = timer.expired.subscribe((e) => (value = e));
    expect(value).toBe(false);
    timer.start(2);

    tickStream.next(1);
    expect(timer.state).toBe(1);
    expect(value).toBe(false);

    tickStream.next(2);
    expect(timer.state).toBe(0);
    expect(value).toBe(true);
    sub.unsubscribe();
  });

  it('emits on expired at most once per call to start', () => {
    let value = false;
    const sub = timer.expired.subscribe((e) => (value = e));
    expect(value).toBe(false);
    tickStream.next(1);
    expect(value).toBe(false);

    timer.start(1);
    tickStream.next(2);
    expect(value).toBe(true);

    value = false;
    tickStream.next(3);
    expect(value).toBe(false);
    sub.unsubscribe();
  });
});
