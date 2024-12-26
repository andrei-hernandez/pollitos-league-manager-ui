import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MatchesComponent } from './features/matches/matches.component';
import { CreateMatchComponent } from './features/matches/pages/create-match/create-match.component';
import { PlayersComponent } from './features/players/players.component';
import { CreatePlayerComponent } from './features/players/pages/create-player/create-player.component';
import { EditPlayerComponent } from './features/players/pages/edit-player/edit-player.component';
import { TeamsComponent } from './features/teams/teams.component';
import { CreateTeamComponent } from './features/teams/pages/create-team/create-team.component';
import { EditTeamComponent } from './features/teams/pages/edit-team/edit-team.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Match', component: MatchesComponent },
  { path: 'createMatch', component: CreateMatchComponent },
  { path: 'Players', component: PlayersComponent },
  { path: 'createPlayer', component: CreatePlayerComponent },
  { path: 'editPlayer/:id', component: EditPlayerComponent },
  { path: 'Team', component: TeamsComponent },
  { path: 'createTeam', component: CreateTeamComponent },
  { path: 'editTeam/:idteam', component: EditTeamComponent },

  
 





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
