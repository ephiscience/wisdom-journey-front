import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LevelSelectionComponent } from 'src/app/pregame/level-selection/level-selection.component';
import { PlayerSelectionComponent } from 'src/app/pregame/player-selection/player-selection.component';
import { PregameRoutingModule } from 'src/app/pregame/pregame-routing.module';
import { PregameComponent } from 'src/app/pregame/pregame.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PregameComponent, PlayerSelectionComponent, LevelSelectionComponent],
  imports: [CommonModule, FormsModule, SharedModule, PregameRoutingModule],
})
export class PregameModule {}
