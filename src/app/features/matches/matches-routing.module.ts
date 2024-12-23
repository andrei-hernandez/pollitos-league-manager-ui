import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches.component';
import { CreateMatchComponent } from './pages/create-match/create-match.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  { path: 'create', component: CreateMatchComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
