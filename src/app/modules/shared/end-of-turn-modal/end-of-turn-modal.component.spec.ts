import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EndOfTurnModalComponent } from './end-of-turn-modal.component';

describe('EndOfTurnModalComponent', () => {
  let component: EndOfTurnModalComponent;
  let fixture: ComponentFixture<EndOfTurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndOfTurnModalComponent],
      providers: [NgbModal, NgbActiveModal],
    }).compileComponents();
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
