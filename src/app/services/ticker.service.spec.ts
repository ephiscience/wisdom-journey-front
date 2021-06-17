import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TickerService } from './ticker.service';

describe('TickerService', () => {
  let service: TickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.ticks).toBeTruthy();
  });

  it('should emit an event each second when started', fakeAsync(() => {
    let value = -1;
    const sub = service.ticks().subscribe((e) => (value = e));
    service.start();

    expect(value).toEqual(-1);
    tick(1000);
    expect(value).toEqual(1);
    tick(1000);
    expect(value).toEqual(2);

    sub.unsubscribe();
  }));

  it('does not emit events after being paused and resumes on start', fakeAsync(() => {
    let value = -1;
    const sub = service.ticks().subscribe((e) => (value = e));
    service.start();

    expect(value).toEqual(-1);
    tick(1000);
    expect(value).toEqual(1);
    service.stop();
    tick(1000);
    expect(value).toEqual(1);

    // Resumes counting when starting again
    service.start();
    tick(1000);
    expect(value).toEqual(2);

    sub.unsubscribe();
  }));
});
