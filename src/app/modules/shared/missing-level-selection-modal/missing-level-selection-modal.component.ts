import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-missing-level-selection-modal',
  template: `
    <div class="modal-content">
      <div class="modal-header ">
        <h4 class="modal-title w-100 text-center">Fin du Tour</h4>
        <button type="button" class="close" aria-label="Close" (click)="dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body w-100 text-center">
        <p>Auditeurs, est ce que les réponses à la question étaient pertinentes ?</p>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn-yes" (click)="close()">Oui</button>
        <button type="button" class="btn-no" (click)="dismiss()">Non</button>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep .modal-content {
        //opacity: 1;
        z-index: 100;
        width: 479px;
        height: 381px;
        border-radius: 56px;

        box-shadow: 0px 0px 10px #000000;

        background-color: #ffffff;
      }
      .modal-header {
        border-bottom: 0px;
      }
      .modal-title {
        text-align: center;
        font: normal normal normal 60px/71px Chela One;
        color: #000000;
      }
      .modal-body {
        font: normal normal normal 33px/39px Roboto;
        color: #000000;
        border-bottom: 0px;
      }
      .modal-footer {
        border-top: 0px;
      }
      .btn-yes {
        width: 141px;
        height: 66px;
        background: #9db749 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #707070;
        border-radius: 33px;
        text-align: center;
        margin-right: 20px;
        font: normal normal normal 45px/53px Chela One;
      }
      .btn-no {
        width: 141px;
        height: 66px;
        background: #ed6760 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 2px solid #707070;
        border-radius: 33px;
        text-align: center;
        margin-left: 20px;
        font: normal normal normal 45px/53px Chela One;
      }
      .close {
        font-size: 40px;
      }
    `,
  ],
})
export class MissingLevelSelectionModalComponent {
  constructor(private modal: NgbActiveModal) {}

  dismiss() {
    this.modal.dismiss();
  }

  close() {
    this.modal.close();
  }
}
