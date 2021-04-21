import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { QuitGameConfirmationModalComponent } from 'src/app/modules/shared/quit-game-confirmation-modal/quit-game-confirmation-modal.component';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';
import { EndOfTurnModalComponent } from './end-of-turn-modal/end-of-turn-modal.component';
import { VictoryModalComponent } from './victory-modal/victory-modal.component';
import { DefeatModalComponent } from './defeat-modal/defeat-modal.component';
import { MissingPlayerNameModalComponent } from './missing-player-name-modal/missing-player-name-modal.component';
import { MissingLevelSelectionModalComponent } from './missing-level-selection-modal/missing-level-selection-modal.component';

@NgModule({
  declarations: [
    TimesPipe,
    ModalComponent,
    QuitGameConfirmationModalComponent,
    EndOfTurnModalComponent,
    VictoryModalComponent,
    DefeatModalComponent,
    MissingPlayerNameModalComponent,
    MissingLevelSelectionModalComponent,
  ],
  imports: [CommonModule],
  entryComponents: [QuitGameConfirmationModalComponent],
  exports: [
    ModalComponent,
    TimesPipe,
    QuitGameConfirmationModalComponent,
    EndOfTurnModalComponent,
    VictoryModalComponent,
    DefeatModalComponent,
    MissingPlayerNameModalComponent,
    MissingLevelSelectionModalComponent,
  ],
})
export class SharedModule {}
