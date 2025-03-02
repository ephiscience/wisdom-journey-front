import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'new', loadChildren: () => import('./modules/pregame/pregame.module').then((m) => m.PregameModule) },
	{ path: 'game', loadChildren: () => import('./modules/game/game.module').then((m) => m.GameModule) },
];
