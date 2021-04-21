import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefeatModalComponent } from './defeat-modal.component';

describe('DefeatModalComponent', () => {
  let component: DefeatModalComponent;
  let fixture: ComponentFixture<DefeatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefeatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefeatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
