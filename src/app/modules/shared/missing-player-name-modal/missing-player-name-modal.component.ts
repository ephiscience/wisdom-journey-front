import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-missing-player-name-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title w-100 text-center"></h4>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body w-100 text-center">
      <p>Veuillez entrer un nom pour chaque joueur</p>
    </div>
    <div class="modal-footer justify-content-center">
      <button type="button" class="btn-ok" (click)="dismiss()">Ok</button>
    </div>
  `,
  styles: [
    `
      .modal-header {
        border-bottom: 0;
      }

      .modal-title {
        text-align: center;
        font: normal normal normal 60px/71px Chela One;
        color: #000000;
      }

      .modal-body {
        font: normal normal normal 33px/39px Roboto;
        color: #000000;
        border-bottom: 0;
      }

      .modal-footer {
        border-top: 0;
      }

      .btn-ok {
        width: 141px;
        height: 66px;
        background: #b2b2b2 0 0 no-repeat padding-box;
        box-shadow: 0 3px 6px #00000029;
        border: 2px solid #707070;
        border-radius: 33px;
        text-align: center;
        font: normal normal normal 45px/53px Chela One;
      }

      .close {
        font-size: 40px;
      }
    `,
  ],
})
export class MissingPlayerNameModalComponent {
  constructor(private modal: NgbActiveModal) {}

  dismiss() {
    this.modal.dismiss();
  }

  close() {
    this.modal.close();
  }
}
