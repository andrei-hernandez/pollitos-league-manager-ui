import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches/services/matches.service'; 
import { Match } from 'src/app/features/matches/models/match.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  imports: [CommonModule, FormsModule],
  
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  newMatch: Match = {
    idLeague: 0,
    idMatch: 0,
    localTeamId: 0,
    visitTeamid: 0,
    goalLocal: 0,
    goalVisit: 0,
  }; 
  matchToEdit: Match | null = null;

  constructor(private matchService: MatchesService) {}

  ngOnInit(): void {
    this.loadMatches(); 
  }

  loadMatches(idTeam?: number): void {
    if (idTeam !== undefined) {
      this.matchService.getMatches(idTeam).subscribe(
        (data: Match[]) => {
          this.matches = data;
          console.log('Matches:', this.matches); 
        },
        error => {
          console.error('Error al cargar los partidos', error);
        }
      );
    } 
  }

  createMatch(): void {
    if (
      this.newMatch.idLeague &&
      this.newMatch.localTeamId &&
      this.newMatch.visitTeamid
    ) {
      this.matchService.createMatch(this.newMatch).subscribe(
        (match: Match) => {
          this.matches.push(match);
          this.newMatch = {
            idLeague: 1,
            idMatch: 0,
            localTeamId: 0,
            visitTeamid: 0,
            goalLocal: 0,
            goalVisit: 0,
          }; // Reinicia el formulario
          console.log('Match created:', match);
        },
        error => {
          console.error('Error al crear el partido', error);
        }
      );
    }
  }

  editMatch(match: Match): void {
    this.matchToEdit = { ...match }; // Crea una copia para evitar modificar directamente el array
  }


  deleteMatch(idMatch: number): void {
    this.matchService.deleteMatches(idMatch).subscribe(
      () => {
        this.matches = this.matches.filter(m => m.idMatch !== idMatch); // Filtra el array para eliminar el partido
        console.log('Match deleted:', idMatch);
      },
      error => {
        console.error('Error al eliminar el partido', error);
      }
    );
  }
}
