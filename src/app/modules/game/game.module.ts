import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuxonModule } from 'luxon-angular';
import { BoardComponent } from 'src/app/modules/game/board/board.component';
import { CriterionCardComponent } from 'src/app/modules/game/criterion-card/criterion-card.component';
import { CriterionPointsComponent } from 'src/app/modules/game/criterion-points/criterion-points.component';
import { GameRoutingModule } from 'src/app/modules/game/game-routing.module';
import { GameStatusComponent } from 'src/app/modules/game/game-status/game-status.component';
import { GameComponent } from 'src/app/modules/game/game.component';
import { PlayerComponent } from 'src/app/modules/game/player/player.component';
import { PlayersComponent } from 'src/app/modules/game/players/players.component';
import { QuestionPointsComponent } from 'src/app/modules/game/question-points/question-points.component';
import { QuestionComponent } from 'src/app/modules/game/question/question.component';
import { TimerComponent } from 'src/app/modules/game/timer/timer.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    BoardComponent,
    PlayerComponent,
    CriterionCardComponent,
    QuestionComponent,
    GameComponent,
    GameStatusComponent,
    PlayersComponent,
    CriterionPointsComponent,
    QuestionPointsComponent,
    TimerComponent,
  ],
  imports: [CommonModule, LuxonModule, SharedModule, GameRoutingModule],
})
export class GameModule {}
