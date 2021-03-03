import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { CriterionCardComponent } from './criterion-card/criterion-card.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { PlayersComponent } from './players/players.component';
import { CriterionPointsComponent } from './criterion-points/criterion-points.component';
import { QuestionPointsComponent } from './question-points/question-points.component';
import { TimerComponent } from './timer/timer.component';
import { HomeComponent } from './home/home.component';
import { PregameComponent } from './pregame/pregame.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { LevelSelectionComponent } from './level-selection/level-selection.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
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
    HomeComponent,
    PregameComponent,
    PlayerSelectionComponent,
    LevelSelectionComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
