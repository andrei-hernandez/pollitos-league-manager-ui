import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/features/teams/services/teams.service';
import { Router } from '@angular/router';
import { Team } from 'src/app/features/teams/models/team.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule,MatFormFieldModule,MatInputModule],
  standalone: true,
})
export default class CreateTeamComponent implements OnInit {
  team: Team = {
    idteam: 0, 
    idLeague: 0, 
    teamname: '', 
  };

  constructor(private teamsService: TeamsService, private router: Router) {}

  ngOnInit(): void {}
  createTeam(): void {
    if (this.team.teamname && this.team.idLeague) {
      this.teamsService.createTeam(this.team).subscribe({
        next: (newTeam) => {
          alert('Equipo creado exitosamente');
          this.router.navigate(['Team']); 
        },
        error: (err) => {
          console.error('Error al crear el equipo', err);
          alert('Hubo un error al crear el equipo. Intenta nuevamente.');
        },
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}
