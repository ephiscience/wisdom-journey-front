import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from 'src/app/modules/game/players/players.component';

describe('PlayersComponent', () => {
	let component: PlayersComponent;
	let fixture: ComponentFixture<PlayersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [PlayersComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
