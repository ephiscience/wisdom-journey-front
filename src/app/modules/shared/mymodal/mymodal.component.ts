import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/modules/shared/mymodal/mymodal.config';

@Component({
  selector: 'app-mymodal',
  template: `
    <ng-template #modal>
      <div class="modal-header">
        <h4 class="modal-title">{{ modalConfig.modalTitle }}</h4>
        <button type="button" class="close" aria-label="Close" (click)="dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>the content</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="close()">Close</button>
      </div>
    </ng-template>
  `,
  /*styleUrls: ['./mymodal.component.css'],*/
})
@Injectable()
export class MymodalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<MymodalComponent>;
  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
}
