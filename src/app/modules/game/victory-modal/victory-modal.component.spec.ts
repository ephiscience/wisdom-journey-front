import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { VictoryModalComponent } from './victory-modal.component';

describe('VictoryModalComponent', () => {
	let component: VictoryModalComponent;
	let fixture: ComponentFixture<VictoryModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [VictoryModalComponent],
    providers: [NgbModal, NgbActiveModal],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VictoryModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
