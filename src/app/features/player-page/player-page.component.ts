import { Component, OnInit } from '@angular/core';
import { PlayerDTO } from '../../core/models/player.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeagueService } from '../../../app/core/services/league.service';
import { TeamDTO } from '../../core/models/team.model';

@Component({
  selector: 'app-player-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css'],
})
export class PlayerComponent implements OnInit {
  error: string | null = null;

  selectedLeague: string = 'soccerleague';
  selectedTeam: string = '';
  playersDTO: PlayerDTO[] = [];
  editingPlayer: PlayerDTO | null = null;


  teams: TeamDTO[] = [];

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  editPlayer(player: PlayerDTO): void {
    this.editingPlayer = { ...player };
  }
  
  cancelEditing(): void {
    this.editingPlayer = null;
  }

  saveEditing(): void {
    if (!this.editingPlayer) return;
  
    const { id, team } = this.editingPlayer;
  
  
    this.leagueService.editPlayer(this.selectedLeague, team, id, this.editingPlayer).subscribe({
      next: () => {
        const index = this.playersDTO.findIndex((player) => player.id === id);
        if (index !== -1) {
          this.playersDTO[index] = {id: this.editingPlayer!.id, 
          name: this.editingPlayer!.name, 
          team: this.editingPlayer!.team, 
          };
          this.loadPlayersByTeam(this.editingPlayer!.team);
        }
        this.cancelEditing(); 
      },
      error: (err) => {
        this.error = "Couldn't update player";
        console.error(err);
      },
    });
  }


  loadTeams(): void {
    this.leagueService.getAllTeams(this.selectedLeague).subscribe({
      next: (teams) => {
        this.teams = teams;
        this.error = null;
      },
      error: (err) => {
        this.error = "Can't load teams";
        console.error(err);
      },
    });
  }

  
  loadPlayersByTeam(teamName: string): void {

    this.leagueService.getAllPlayers(this.selectedLeague, teamName).subscribe({
      next: (players) => {
        this.playersDTO = players;
        this.error = null;
      },
      error: (err) => {
        this.error = "Can't load players for the selected team";
        console.error(err);
      },
    });
  }


  changeLeague(league: string): void {
    this.selectedLeague = league;
    this.selectedTeam = ''; 
    this.playersDTO = []; 
    this.loadTeams();
  }

  createNewPlayer(): void {

    this.editingPlayer = {
      id: 0, 
      name: '',
      team: this.selectedTeam,
    };
  }
  
  
}
