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
import { EndOfTurnModalComponent } from './end-of-turn-modal/end-of-turn-modal.component';
import { VictoryModalComponent } from './victory-modal/victory-modal.component';
import { DefeatModalComponent } from './defeat-modal/defeat-modal.component';

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
        EndOfTurnModalComponent,
        VictoryModalComponent,
        DefeatModalComponent,
    ],
    imports: [CommonModule, LuxonModule, SharedModule, GameRoutingModule],
    exports: [EndOfTurnModalComponent, VictoryModalComponent, DefeatModalComponent]
})
export class GameModule {}
