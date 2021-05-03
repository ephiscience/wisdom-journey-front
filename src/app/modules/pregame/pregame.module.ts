import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LevelSelectionComponent } from 'src/app/modules/pregame/level-selection/level-selection.component';
import { PlayerSelectionComponent } from 'src/app/modules/pregame/player-selection/player-selection.component';
import { PregameRoutingModule } from 'src/app/modules/pregame/pregame-routing.module';
import { PregameComponent } from 'src/app/modules/pregame/pregame.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MissingPlayerNameModalComponent } from './missing-player-name-modal/missing-player-name-modal.component';
import { MissingLevelSelectionModalComponent } from './missing-level-selection-modal/missing-level-selection-modal.component';

@NgModule({
  declarations: [
    PregameComponent,
    PlayerSelectionComponent,
    LevelSelectionComponent,
    MissingPlayerNameModalComponent,
    MissingLevelSelectionModalComponent,
  ],
  entryComponents: [MissingPlayerNameModalComponent, MissingLevelSelectionModalComponent],
  imports: [CommonModule, FormsModule, SharedModule, PregameRoutingModule],
  exports: [MissingPlayerNameModalComponent, MissingLevelSelectionModalComponent],
})
export class PregameModule {}
