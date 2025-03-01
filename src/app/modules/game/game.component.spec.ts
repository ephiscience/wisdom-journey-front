import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameComponent } from 'src/app/modules/game/game.component';
import { CurrentGameService } from '../../services/current-game.service';
import { EMPTY, of } from 'rxjs';
import { PlayerSelectionComponent } from '../pregame/player-selection/player-selection.component';
import { MockComponent } from 'ng-mocks';

describe('GameComponent', () => {
	let component: GameComponent;
	let fixture: ComponentFixture<GameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameComponent, MockComponent(PlayerSelectionComponent)],
			providers: [{ provide: CurrentGameService, useValue: { currentGame: () => EMPTY } }],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
