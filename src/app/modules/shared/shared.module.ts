import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { QuitGameConfirmationModalComponent } from 'src/app/modules/shared/quit-game-confirmation-modal/quit-game-confirmation-modal.component';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';
import { EndOfTurnModalComponent } from './end-of-turn-modal/end-of-turn-modal.component';

@NgModule({
  declarations: [TimesPipe, ModalComponent, QuitGameConfirmationModalComponent, EndOfTurnModalComponent],
  imports: [CommonModule],
  entryComponents: [QuitGameConfirmationModalComponent],
  exports: [ModalComponent, TimesPipe, QuitGameConfirmationModalComponent, EndOfTurnModalComponent],
})
export class SharedModule {}
