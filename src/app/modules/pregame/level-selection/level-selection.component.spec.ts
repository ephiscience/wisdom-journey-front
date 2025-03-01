import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LevelSelectionComponent } from 'src/app/modules/pregame/level-selection/level-selection.component';

describe('LevelSelectionComponent', () => {
	let component: LevelSelectionComponent;
	let fixture: ComponentFixture<LevelSelectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LevelSelectionComponent],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LevelSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
