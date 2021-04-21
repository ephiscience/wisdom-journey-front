import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryModalComponent } from './victory-modal.component';

describe('VictoryModalComponent', () => {
  let component: VictoryModalComponent;
  let fixture: ComponentFixture<VictoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
