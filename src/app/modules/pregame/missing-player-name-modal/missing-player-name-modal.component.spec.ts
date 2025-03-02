import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MissingPlayerNameModalComponent } from './missing-player-name-modal.component';

describe('MissingPlayerNameModalComponent', () => {
	let component: MissingPlayerNameModalComponent;
	let fixture: ComponentFixture<MissingPlayerNameModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
    imports: [MissingPlayerNameModalComponent],
    providers: [NgbModal, NgbActiveModal],
}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MissingPlayerNameModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
