import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LevelSelectionComponent } from 'src/app/modules/pregame/level-selection/level-selection.component';
import { PlayerSelectionComponent } from 'src/app/modules/pregame/player-selection/player-selection.component';
import { PregameRoutingModule } from 'src/app/modules/pregame/pregame-routing.module';
import { PregameComponent } from 'src/app/modules/pregame/pregame.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [PregameComponent, PlayerSelectionComponent, LevelSelectionComponent],
  imports: [CommonModule, FormsModule, SharedModule, PregameRoutingModule],
})
export class PregameModule {}
