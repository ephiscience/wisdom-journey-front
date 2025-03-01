import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionComponent } from 'src/app/modules/pregame/player-selection/player-selection.component';
import { FormsModule } from '@angular/forms';

describe('PlayerSelectionComponent', () => {
	let component: PlayerSelectionComponent;
	let fixture: ComponentFixture<PlayerSelectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
      imports: [FormsModule],
			declarations: [PlayerSelectionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
