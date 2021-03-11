import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPointsComponent } from './question-points.component';

describe('QuestionPointsComponent', () => {
  let component: QuestionPointsComponent;
  let fixture: ComponentFixture<QuestionPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionPointsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
