import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PregameComponent } from 'src/app/modules/pregame/pregame.component';

const routes: Routes = [{ path: '', component: PregameComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PregameRoutingModule {}
