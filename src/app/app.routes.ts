
import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'baseball',
    pathMatch: 'full'
  },
  {
    path: ':league',
    loadComponent: () => import('./layout/layout/layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./layout/components/welcome/welcome.component')
      },
      {
        path: 'teams',
        loadComponent: () => import('./features/teams/teams/teams.component')
      },
      {
        path: 'players',
        loadComponent: () => import('./features/players/players/players.component')
      },
      {
        path: 'matches',
        loadComponent: () => import('./features/matches/matches/matches.component')
      },

    ]
  },
  {
    path: ':league/createTeam',
    loadComponent: () => import('./features/teams/create-team/create-team.component')
  },
  {
    path: 'editTeam/:id',
    loadComponent: () => import('./features/teams/create-team/create-team.component')
  },
  {
    path: ':league/createPlayer',
    loadComponent: () => import('./features/players/create-player/create-player.component')
  },
  {
    path: 'editPlayer/:id',
    loadComponent: () => import('./features/players/create-player/create-player.component')
  },
  {
    path: ':league/createMatch',
    loadComponent: () => import('./features/matches/create-match/create-match.component')
  },
  {
    path: 'instructions',
    loadComponent: () => import('./features/pages/instructions/instructions.component')
  },
  {
    path: '**',
    loadComponent: () => import('./features/pages/not-found/not-found.component')
  },
]
