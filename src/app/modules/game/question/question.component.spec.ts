import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from 'src/app/modules/game/question/question.component';

describe('QuestionComponent', () => {
	let component: QuestionComponent;
	let fixture: ComponentFixture<QuestionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [QuestionComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
