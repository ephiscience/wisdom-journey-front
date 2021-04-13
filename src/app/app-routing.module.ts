import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', loadChildren: () => import('./pregame/pregame.module').then((m) => m.PregameModule) },
  { path: 'game', loadChildren: () => import('./game/game.module').then((m) => m.GameModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
