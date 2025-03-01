import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LevelSelectionComponent } from 'src/app/modules/pregame/level-selection/level-selection.component';
import { CurrentGameService } from '../../../services/current-game.service';
import { DifficultyCardComponent } from '../difficulty-card/difficulty-card.component';
import { MockComponent } from 'ng-mocks';

describe('LevelSelectionComponent', () => {
	let component: LevelSelectionComponent;
	let fixture: ComponentFixture<LevelSelectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LevelSelectionComponent, MockComponent(DifficultyCardComponent)],
			imports: [RouterTestingModule],
			providers: [{ provide: CurrentGameService, useValue: {} }],
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
