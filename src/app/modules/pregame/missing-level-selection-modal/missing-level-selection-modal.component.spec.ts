import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MissingLevelSelectionModalComponent } from './missing-level-selection-modal.component';

describe('MissingLevelSelectionModalComponent', () => {
	let component: MissingLevelSelectionModalComponent;
	let fixture: ComponentFixture<MissingLevelSelectionModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MissingLevelSelectionModalComponent],
			providers: [NgbModal, NgbActiveModal],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MissingLevelSelectionModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
