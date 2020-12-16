import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { CriterionCardComponent } from './criterion-card/criterion-card.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerComponent,
    CriterionCardComponent,
    QuestionComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
