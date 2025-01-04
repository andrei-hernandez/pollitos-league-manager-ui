import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeagueService } from './services/league.sevice';
import { LeagueModel } from './models/league.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule, FormsModule ,MatButtonModule, MatInputModule, MatFormFieldModule,  MatTableModule, MatIconModule],
  standalone : true,
})
export default class HomeComponent implements OnInit {
  leagues: LeagueModel[] = [];
  displayedColumns: string[] = ['idLeague', 'nameleague'];

  constructor(private leagueService: LeagueService, private router: Router) {}

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe({
      next: (data) => (this.leagues = data),
      error: (err) => console.error('Error al obtener las ligas', err),
    });
  }

  onSelectLeague(league: LeagueModel): void {
    localStorage.setItem('selectedLeagueId', league.idLeague.toString());
    alert(`Liga seleccionada: ${league.nameleague}`);
  }
}
