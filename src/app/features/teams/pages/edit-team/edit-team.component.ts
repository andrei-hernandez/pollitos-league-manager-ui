import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/features/teams/services/teams.service';
import { Team } from 'src/app/features/teams/models/team.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  standalone: true
})
export class EditTeamComponent implements OnInit {
  team: Team = { idteam: 0, idLeague: 0, teamname: '' }; 
  teamId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamId = +this.route.snapshot.paramMap.get('idteam')!;
    this.loadTeam(this.teamId);
    console.log('ID del equipo en la URL:', this.teamId);
  }

  loadTeam(teamId: number): void {
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        console.log('Equipos cargados:', data);
        this.team = data.find(t => t.idteam === teamId) || { idteam: teamId, idLeague: 0, teamname: '' };
        if (!this.team.idteam) {
          console.error('Equipo no encontrado');
        } else {
          console.log('Equipo encontrado:', this.team);
        }
      },
      error: (err) => console.error('Error al cargar los equipos:', err),
    });
  }
  updateTeam(): void {
    this.teamsService.updateTeam(this.team.idteam, this.team).subscribe({
      next: (updatedTeam) => {
        console.log('Equipo actualizado:', updatedTeam);
        this.router.navigate(['Team']); 
      },
      error: (err) => console.error('Error al actualizar el equipo:', err),
    });
  }
}
