import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatusComponent } from 'src/app/modules/game/game-status/game-status.component';

describe('GameStatusComponent', () => {
	let component: GameStatusComponent;
	let fixture: ComponentFixture<GameStatusComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [GameStatusComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
