import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPlayerNameModalComponent } from './missing-player-name-modal.component';

describe('MissingPlayerNameModalComponent', () => {
  let component: MissingPlayerNameModalComponent;
  let fixture: ComponentFixture<MissingPlayerNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingPlayerNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPlayerNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
