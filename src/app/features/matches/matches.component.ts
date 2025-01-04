import { Component, OnInit } from '@angular/core';
import { MatchesService } from './services/matches.service';
import { Match } from './models/match.model';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matches-home',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
   imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,  MatTableModule, MatIconModule],
})
export default  class MatchesComponent implements OnInit {
  matches: Match[] = [];
  searchTeamId: number = 0;
  displayedColumns: string[] = [
    'idmatch',
    'idleague',
    'localteamid',
    'visitteamid',
    'goallocal',
    'goalVisit',
    'actions',
  ];

  constructor(private matchesService: MatchesService, private router: Router) {}

  ngOnInit(): void {
    this.loadMatches();
  }


  loadMatches( ): void {
    let idLeague = localStorage.getItem('selectedLeagueId');
    const idLeagueNumber = Number(idLeague);
    if (idLeagueNumber) {
      this.matchesService.getLeague(idLeagueNumber).subscribe({
        next: (data) => {
          this.matches = data;
          console.log('Partidos cargados:', data);
        },
        error: (err) => console.error('Error al cargar los partidos:', err),
      });
    } 
      
    }

  searchMatches(teamId: number ): void {
    let idLeague = localStorage.getItem('selectedLeagueId');
    const idLeagueNumber = Number(idLeague);
    if (teamId) {
      this.matchesService.getMatches(teamId,idLeagueNumber).subscribe({
        next: (data) => {
          this.matches = data;
          console.log('Partidos cargados:', data);
        },
        error: (err) => console.error('Error al cargar los partidos:', err),
      });
    } 
      
    }
   
  


  deleteMatch(idMatch: number): void {
    if (confirm('¿Estás seguro de eliminar este partido?')) {
      this.matchesService.deleteMatches(idMatch).subscribe({
        next: () => {
          console.log('Partido eliminado:', idMatch);
          this.loadMatches(); 
        },
        error: (err) => console.error('Error al eliminar el partido:', err),
      });
    }
  }


  navigateToCreate(): void {
    this.router.navigate(['createMatch']);
  }
}
