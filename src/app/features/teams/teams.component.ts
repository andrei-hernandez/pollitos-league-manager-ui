import { TeamsService } from 'src/app/features/teams/services/teams.service';
import { Team } from 'src/app/features/teams/models/team.model';

import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  filteredTeams: Team[] = [];
  searchTeamId: number = 0;

  displayedColumns: string[] = ['idteam', 'teamname', 'idLeague', 'actions'];

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    let idLeague = localStorage.getItem('selectedLeagueId');
      const idLeagueNumber = Number(idLeague);
    this.teamsService.getTeamsbyLeague(idLeagueNumber).subscribe({
      next: (data: Team[]) => {
        this.teams = data;
        this.filteredTeams = data;
      },
      error: (err: any) => {
        console.error('Error al cargar los equipos:', err);
      },
    });
  }

  searchTeam(): void {
    this.filteredTeams = this.searchTeamId
      ? this.teams.filter((team) => team.idteam === this.searchTeamId)
      : this.teams;
  }

  deleteTeam(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar los jugadores de este equipo?');
    if (confirmDelete) {
      this.teamsService.deleteTeam(id).subscribe({
        next: () => {
          this.loadTeams();
          alert('Los jugadores en el equipo han sido eliminado correctamente');
        },
        error: (err: any) => {
          console.error('Error al eliminar el equipo:', err);
        },
      });
    }
  }
}
