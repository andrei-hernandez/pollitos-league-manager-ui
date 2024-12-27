import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';






  export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./features/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: 'Match',
      loadComponent: () =>
        import('./features/matches/matches.component').then((m) => m.MatchesComponent),
    },
    {
      path: 'createMatch',
      loadComponent: () =>
        import('./features/matches/pages/create-match/create-match.component').then(
          (m) => m.CreateMatchComponent
        ),
    },
    {
      path: 'Players',
      loadComponent: () =>
        import('./features/players/players.component').then((m) => m.PlayersComponent),
    },
    {
      path: 'createPlayer',
      loadComponent: () =>
        import('./features/players/pages/create-player/create-player.component').then(
          (m) => m.CreatePlayerComponent
        ),
    },
    {
      path: 'editPlayer/:id',
      loadComponent: () =>
        import('./features/players/pages/edit-player/edit-player.component').then(
          (m) => m.EditPlayerComponent
        ),
    },
    {
      path: 'Team',
      loadComponent: () =>
        import('./features/teams/teams.component').then((m) => m.TeamsComponent),
    },
    {
      path: 'createTeam',
      loadComponent: () =>
        import('./features/teams/pages/create-team/create-team.component').then(
          (m) => m.CreateTeamComponent
        ),
    },
    {
      path: 'editTeam/:idteam',
      loadComponent: () =>
        import('./features/teams/pages/edit-team/edit-team.component').then(
          (m) => m.EditTeamComponent
        ),
    },
  ];
  
 







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
