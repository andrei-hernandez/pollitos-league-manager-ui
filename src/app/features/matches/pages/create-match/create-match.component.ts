import { Component } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { Match } from 'src/app/features/matches/models/match.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
  imports: [CommonModule, FormsModule],
})
export class CreateMatchComponent {
 matches: Match[] = [];
  newMatch: Partial<Match> = {}; // Cambiar a Partial para aceptar valores opcionales.
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
    console.log('Datos del formulario:', this.newMatch); // Agregar esta línea para depurar
    if (this.newMatch.idleague && this.newMatch.localteamid && this.newMatch.visitteamid) {
      this.matchService.createMatch(this.newMatch as Match).subscribe(
        (match: Match) => {
          this.matches.push(match);
          this.newMatch = {}; // Reinicia el formulario
          console.log('Match created:', match);
        },
        error => {
          console.error('Error al crear el partido', error);
        }
      );
    } else {
      console.warn('Formulario incompleto. Por favor, rellena todos los campos.');
    }
  }

  editMatch(match: Match): void {
    this.matchToEdit = { ...match }; // Crea una copia para evitar modificar directamente el array
  }

  deleteMatch(idMatch: number): void {
    this.matchService.deleteMatches(idMatch).subscribe(
      () => {
        this.matches = this.matches.filter(m => m.idmatch !== idMatch);
        console.log('Match deleted:', idMatch);
      },
      error => {
        console.error('Error al eliminar el partido', error);
      }
    );
  }
}
