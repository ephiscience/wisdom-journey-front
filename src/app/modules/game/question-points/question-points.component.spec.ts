import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPointsComponent } from 'src/app/modules/game/question-points/question-points.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('QuestionPointsComponent', () => {
	let component: QuestionPointsComponent;
	let fixture: ComponentFixture<QuestionPointsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QuestionPointsComponent],
			imports: [SharedModule],
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
