import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from 'src/app/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'game', loadChildren: () => import('./game/game.module').then(i => i.GameModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
