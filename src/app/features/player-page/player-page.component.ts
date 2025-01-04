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
  success: string | null = null;

  selectedLeague: string = 'soccerleague';
  selectedTeam: string = '';
  playersDTO: PlayerDTO[] = [];
  editingPlayer: PlayerDTO | null = null;
  creatingPlayer: boolean = false;

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
    this.creatingPlayer = false; 
  }

  saveEditing(): void {
    if (!this.editingPlayer) return;
  
    const { id, team } = this.editingPlayer;
  
    if (this.creatingPlayer) {
      // Create new player
      this.leagueService
        .createPlayer(this.selectedLeague, this.selectedTeam, this.editingPlayer)
        .subscribe({
          next: () => {
            this.success = 'Player created successfully!';
            this.loadPlayersByTeam(this.selectedTeam);
            this.cancelEditing();
          },
          error: (err) => {
            this.error = "Couldn't create the player";
            console.error(err);
          },
        });
    } else if (id && team) {
      // Edit existing player
      this.leagueService
        .editPlayer(this.selectedLeague, team, id, this.editingPlayer)
        .subscribe({
          next: (message: string) => {
            console.log(message); // Log the backend's response
            this.success = 'Player updated successfully!';
            this.loadPlayersByTeam(this.selectedTeam); // Refresh the list
            this.cancelEditing();
          },
          error: (err) => {
            this.error = "Couldn't update the player";
            console.error(err);
          },
        });
    } else {
      this.error = 'Player ID and team are required to update';
      console.error(this.error);
    }
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
    this.creatingPlayer = true;

    this.editingPlayer = {
      id: 0, 
      name: '',
      team: this.selectedTeam,
    };
  }

  saveNewPlayer(): void {
    if (!this.editingPlayer) return;
  
    this.leagueService
      .createPlayer(this.selectedLeague, this.selectedTeam, this.editingPlayer)
      .subscribe({
        next: () => {
          this.loadPlayersByTeam(this.selectedTeam);
          this.cancelEditing(); 
        },
        error: (err) => {
          this.error = "Couldn't create player";
          console.error(err);
        },
      });
  }
  
  
}
