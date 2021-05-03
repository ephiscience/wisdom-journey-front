import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { QuitGameConfirmationModalComponent } from 'src/app/modules/shared/quit-game-confirmation-modal/quit-game-confirmation-modal.component';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';

@NgModule({
  declarations: [TimesPipe, ModalComponent, QuitGameConfirmationModalComponent],
  imports: [CommonModule],
  entryComponents: [QuitGameConfirmationModalComponent],
  exports: [ModalComponent, TimesPipe, QuitGameConfirmationModalComponent],
})
export class SharedModule {}
