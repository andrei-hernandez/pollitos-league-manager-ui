import { Component } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { Match } from 'src/app/features/matches/models/match.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css',
  imports: [CommonModule, FormsModule,  MatButtonModule,MatFormFieldModule,MatInputModule, RouterModule],
})
export default class CreateMatchComponent {
 matches: Match[] = [];
  newMatch: Partial<Match> = {};
  matchToEdit: Match | null = null;

  constructor(private matchService: MatchesService,  private router: Router ) {}

  createMatch(): void {
    console.log('Datos del formulario:', this.newMatch); 
    if (this.newMatch.idleague && this.newMatch.localteamid && this.newMatch.visitteamid) {
      this.matchService.createMatch(this.newMatch as Match).subscribe(
        (match: Match) => {
          this.matches.push(match);
          this.newMatch = {}; 
          console.log('Match created:', match);
          alert('¡Partido creado con éxito!');
          setTimeout(() => {
            this.router.navigate(['/Match']); 
          }, 2000);
        },
        error => {
          console.error('Error al crear el partido', error);
        }
      );
    } else {
      console.warn('Formulario incompleto. Por favor, rellena todos los campos.');
    }
  }

}
