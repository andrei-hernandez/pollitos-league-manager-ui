import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/features/teams/services/teams.service';
import { Team } from 'src/app/features/teams/models/team.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class TeamsComponent implements OnInit {
  teams: Team[] = []; 
  filteredTeams: Team[] = []; 
  searchTeamId: number = 0; 

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }


  loadTeams(): void {
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.filteredTeams = data;
      },
      error: (err) => console.error('Error al cargar los equipos:', err),
    });
  }


  searchTeam(): void {
    if (this.searchTeamId) {
      this.filteredTeams = this.teams.filter(
        (team) => team.idteam === this.searchTeamId
      );
    } else {
      this.filteredTeams = this.teams; 
    }
  }

  // Eliminar un equipo
  deleteTeam(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      this.teamsService.deleteTeam(id).subscribe({
        next: () => {
          this.loadTeams(); 
          alert('Los miembtos del equipo se ham eliminado correctamente');
        },
        error: (err) => console.error('Error al eliminar el equipo:', err),
      });
    }
  }
}
