import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingLevelSelectionModalComponent } from './missing-level-selection-modal.component';

describe('MissingLevelSelectionModalComponent', () => {
  let component: MissingLevelSelectionModalComponent;
  let fixture: ComponentFixture<MissingLevelSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingLevelSelectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingLevelSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
