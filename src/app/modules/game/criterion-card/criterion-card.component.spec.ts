import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionCardComponent } from 'src/app/modules/game/criterion-card/criterion-card.component';

describe('CriterionCardComponent', () => {
	let component: CriterionCardComponent;
	let fixture: ComponentFixture<CriterionCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [CriterionCardComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CriterionCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
