import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent) },
   //{ path: 'game', loadComponent: () => import('./features/game/game.component').then(m => m.GameComponent) },
  ];