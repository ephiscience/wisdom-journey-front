import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPointsComponent } from 'src/app/modules/game/question-points/question-points.component';

describe('QuestionPointsComponent', () => {
	let component: QuestionPointsComponent;
	let fixture: ComponentFixture<QuestionPointsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [QuestionPointsComponent],
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
