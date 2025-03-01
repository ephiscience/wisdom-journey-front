import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from 'src/app/modules/game/board/board.component';

describe('BoardComponent', () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [BoardComponent],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BoardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
