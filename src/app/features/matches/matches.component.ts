import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/features/matches/services/matches.service';
import { Match } from 'src/app/features/matches/models/match.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches-home',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  searchTeamId: number = 0; 

  constructor(private matchesService: MatchesService, private router: Router) {}

  navigateToCreate() {
    this.router.navigate(['createMatch']); 
  }

  ngOnInit(): void {
    this.loadMatches(); 
  }

 
  loadMatches(teamId: number = 1): void {
    this.matchesService.getMatches(teamId).subscribe({
      next: (data) => {
        this.matches = data;  
        console.log('Partidos cargados:', data);
      },
      error: (err) => console.error('Error al cargar los partidos:', err),
    });
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
}
