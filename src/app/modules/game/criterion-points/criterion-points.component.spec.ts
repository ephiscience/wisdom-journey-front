import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionPointsComponent } from 'src/app/modules/game/criterion-points/criterion-points.component';

describe('CriterionPointsComponent', () => {
	let component: CriterionPointsComponent;
	let fixture: ComponentFixture<CriterionPointsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [CriterionPointsComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CriterionPointsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
