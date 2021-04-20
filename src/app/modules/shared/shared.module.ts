import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';
import { MymodalComponent } from 'src/app/modules/shared/mymodal/mymodal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TimesPipe, ModalComponent, MymodalComponent],
  imports: [CommonModule],
  entryComponents: [MymodalComponent],
  exports: [ModalComponent, TimesPipe, MymodalComponent],
})
export class SharedModule {}
