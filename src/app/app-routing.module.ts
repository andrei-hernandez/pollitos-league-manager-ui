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
  { path: '', component: PlayersComponent },
  {
  path: 'createPlayer',
  loadComponent: () => import('./features/players/pages/create-player/create-player.component').then(m => m.CreatePlayerComponent)
},
{
  path: 'editPlayer/:id',  // Asegúrate de que el parámetro 'id' esté en la ruta
  loadComponent: () => import('./features/players/pages/edit-player/edit-player.component').then(m => m.EditPlayerComponent)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
