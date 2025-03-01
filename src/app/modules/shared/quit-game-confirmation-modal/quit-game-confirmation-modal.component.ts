import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-quit-game-confirm',
	template: `
		<div class="modal-content">
			<div class="modal-header ">
				<h4 class="modal-title w-100 text-center">Quitter</h4>
				<button type="button" class="close" aria-label="Close" (click)="dismiss()">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body w-100 text-center">
				<p>Êtes vous sûr de vouloir quitter la partie en cours ?</p>
			</div>
			<div class="modal-footer justify-content-center">
				<button type="button" class="btn-yes" (click)="close()">Oui</button>
				<button type="button" class="btn-no" (click)="dismiss()">Non</button>
			</div>
		</div>
	`,
	styleUrls: ['../../shared/modals.scss'],
})
export class QuitGameConfirmationModalComponent {
	constructor(private modal: NgbActiveModal) {}

	dismiss() {
		this.modal.dismiss();
	}

	close() {
		this.modal.close();
	}
}
