import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchesService } from './services/matches.service'; // Asegúrate de importar el servicio

@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
   FormsModule   , 
    MatchesComponent
   
  ],
  providers: [MatchesService] 
})
export class MatchesModule { }
