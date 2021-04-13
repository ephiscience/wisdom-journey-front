import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuxonModule } from 'luxon-angular';
import { BoardComponent } from 'src/app/game/board/board.component';
import { CriterionCardComponent } from 'src/app/game/criterion-card/criterion-card.component';
import { CriterionPointsComponent } from 'src/app/game/criterion-points/criterion-points.component';
import { GameRoutingModule } from 'src/app/game/game-routing.module';
import { GameStatusComponent } from 'src/app/game/game-status/game-status.component';
import { GameComponent } from 'src/app/game/game.component';
import { PlayerComponent } from 'src/app/game/player/player.component';
import { PlayersComponent } from 'src/app/game/players/players.component';
import { QuestionPointsComponent } from 'src/app/game/question-points/question-points.component';
import { QuestionComponent } from 'src/app/game/question/question.component';
import { TimerComponent } from 'src/app/game/timer/timer.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
