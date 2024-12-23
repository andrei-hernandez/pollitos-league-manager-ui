import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MatchesComponent } from './features/matches/matches.component';
import { CreateMatchComponent } from './features/matches/pages/create-match/create-match.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'matches', loadChildren: () => import('./features/matches/matches.module').then(m => m.MatchesModule) },
  { path: '', redirectTo: '/matches', pathMatch: 'full' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
