import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchesService } from './services/matches.service'; // Asegúrate de importar el servicio
import { CreateMatchComponent } from './pages/create-match/create-match.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    FormsModule   , 
    MatchesComponent,
    CreateMatchComponent,
   
  ],
  providers: [MatchesService] 
})
export class MatchesModule { }
