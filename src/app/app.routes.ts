import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teams',
    loadComponent: () =>
      import('./features/teams/team-page/team-page.component').then((m) => m.TeamPageComponent),
  },
  {
    path: '',
    redirectTo: '/teams',
    pathMatch: 'full',
  },
  {
    path: 'matches',
    loadComponent: () =>
      import('./features/match-page/match-page.component').then((m)=> m.MatchesComponent)
  },
  {
    path: 'players',
    loadComponent: () =>
      import('./features/player-page/player-page.component').then((m)=> m.PlayerComponent)
  }
]