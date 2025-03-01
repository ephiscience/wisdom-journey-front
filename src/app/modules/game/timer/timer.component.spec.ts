import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonModule } from 'luxon-angular';

import { TimerComponent } from 'src/app/modules/game/timer/timer.component';

describe('TimerComponent', () => {
	let component: TimerComponent;
	let fixture: ComponentFixture<TimerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TimerComponent],
			imports: [LuxonModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TimerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
