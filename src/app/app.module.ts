import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component'; // Si tienes el componente Home
import { MatchesComponent } from './features/matches/matches.component'; // Asegúrate de que este componente esté correctamente importado
import { CreatePlayerComponent } from './features/players/pages/create-player/create-player.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

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
   BrowserModule,
   BrowserAnimationsModule,
   MatButtonModule,
   MatTableModule,
   MatInputModule,
   MatCardModule,
   MatPaginatorModule,
   MatIconModule,
   MatFormFieldModule,
   MatToolbarModule,
   FlexLayoutModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
