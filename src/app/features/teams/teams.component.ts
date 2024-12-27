import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/features/teams/services/teams.service';
import { Team } from 'src/app/features/teams/models/team.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,  MatTableModule, MatIconModule],
  standalone: true,
})
export class TeamsComponent implements OnInit {
  teams: Team[] = []; 
  filteredTeams: Team[] = []; 
  searchTeamId: number = 0; 

  displayedColumns: string[] = ['idteam', 'teamname', 'idLeague', 'actions']; // Definir las columnas que se mostrarán en la tabla

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

  deleteTeam(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      this.teamsService.deleteTeam(id).subscribe({
        next: () => {
          this.loadTeams(); 
          alert('El equipo ha sido eliminado correctamente');
        },
        error: (err) => console.error('Error al eliminar el equipo:', err),
      });
    }
  }
}
