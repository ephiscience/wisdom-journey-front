import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quit-game-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Quitter</h4>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Etes vous sûr de vouloir quitter la partie en cours ?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-danger" (click)="close()">Oui</button>
      <button type="button" class="btn btn-outline-dark" (click)="dismiss()">Non</button>
    </div>
  `,
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
