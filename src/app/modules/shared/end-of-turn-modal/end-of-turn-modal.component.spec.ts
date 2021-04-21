import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfTurnModalComponent } from './end-of-turn-modal.component';

describe('EndOfTurnModalComponent', () => {
  let component: EndOfTurnModalComponent;
  let fixture: ComponentFixture<EndOfTurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfTurnModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfTurnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
