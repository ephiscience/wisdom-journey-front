import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';

@NgModule({
  declarations: [TimesPipe, ModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent, TimesPipe],
})
export class SharedModule {}
