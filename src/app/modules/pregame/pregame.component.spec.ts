import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PregameComponent } from 'src/app/modules/pregame/pregame.component';
import { CurrentGameService } from '../../services/current-game.service';
import { MockComponent } from 'ng-mocks';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';

describe('PregameComponent', () => {
	let component: PregameComponent;
	let fixture: ComponentFixture<PregameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    providers: [{ provide: CurrentGameService, useValue: {} }],
    imports: [RouterTestingModule, PregameComponent, MockComponent(PlayerSelectionComponent)],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PregameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
