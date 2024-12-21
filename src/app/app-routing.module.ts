import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MatchesComponent } from './features/matches/matches.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: '', component: MatchesComponent }, 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
