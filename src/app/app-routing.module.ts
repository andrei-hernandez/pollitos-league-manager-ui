import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MatchesComponent } from './features/matches/matches.component';
import { CreateMatchComponent } from './features/matches/pages/create-match/create-match.component';
import { PlayersComponent } from './features/players/players.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'Match', component: MatchesComponent },
  { path: 'createMatch', component: CreateMatchComponent },
  { path: 'Players', component: PlayersComponent },
  {
  path: 'createPlayer',
  loadComponent: () => import('./features/players/pages/create-player/create-player.component')
  .then(m => m.CreatePlayerComponent)
},
{
  path: 'editPlayer/:id', 
  loadComponent: () => import('./features/players/pages/edit-player/edit-player.component')
  .then(m => m.EditPlayerComponent)
},
{
  path: '', 
  loadComponent: () => import('./features/teams/teams.component')
  .then(m => m.TeamsComponent)
},
{
  path: 'createTeam', 
  loadComponent: () => import('./features/teams/pages/create-team/create-team.component')
  .then(m => m.CreateTeamComponent)
},
{
  path: 'editTeam/:idteam', 
  loadComponent: () => import('./features/teams/pages/edit-team/edit-team.component')
  .then(m => m.EditTeamComponent)
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
