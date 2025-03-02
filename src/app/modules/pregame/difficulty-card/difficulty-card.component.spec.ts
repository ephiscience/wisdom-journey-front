import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyCardComponent } from 'src/app/modules/pregame/difficulty-card/difficulty-card.component';

describe('DifficultyCardComponent', () => {
	let component: DifficultyCardComponent;
	let fixture: ComponentFixture<DifficultyCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [DifficultyCardComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DifficultyCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
