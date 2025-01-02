import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./features/home/home.component')
    },
    {
      path: 'Match',
      loadComponent: () =>
        import('./features/matches/matches.component')
    },
    {
      path: 'createMatch',
      loadComponent: () =>
        import('./features/matches/pages/create-match/create-match.component')
    },
    {
      path: 'Players',
      loadComponent: () =>
        import('./features/players/players.component')
    },
    {
      path: 'createPlayer',
      loadComponent: () =>
        import('./features/players/pages/create-player/create-player.component')
    },
    {
      path: 'editPlayer/:id',
      loadComponent: () =>
        import('./features/players/pages/edit-player/edit-player.component')
    },
    {
      path: 'Team',
      loadComponent: () =>
        import('./features/teams/teams.component')
    },
    {
      path: 'createTeam',
      loadComponent: () =>
        import('./features/teams/pages/create-team/create-team.component')
    },
    {
      path: 'editTeam/:idteam',
      loadComponent: () =>
        import('./features/teams/pages/edit-team/edit-team.component')
        
    },
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
