import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component'; // Si tienes el componente Home
import { MatchesComponent } from './features/matches/matches.component'; // Asegúrate de que este componente esté correctamente importado
import { CreatePlayerComponent } from './features/players/pages/create-player/create-player.component';

@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [ 
    MatchesComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   HomeComponent,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
