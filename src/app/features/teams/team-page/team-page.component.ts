import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../core/services/league.service';
import { TeamDTO } from '../../../core/models/team.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerDTO } from '../../../core/models/player.model';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent implements OnInit {
  constructor(private leagueService: LeagueService) {}

  teams: TeamDTO[] = [];
  newTeam: TeamDTO = { name: '', league: '', playerDTOS: [] };
  selectedLeague: string = 'soccerleague';
  error: string | null = null; //Always by default;
  success: string | null = null;

  //For editing:
  editingTeam: TeamDTO | null = null;

  //Delete players:
  players: PlayerDTO[] =[];

  //The main method to load the teams.
  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.leagueService.getAllTeams(this.selectedLeague).subscribe({
      next: (teams) => {
        this.teams = teams.filter((team) => team.league === this.selectedLeague);
      },
      error: (err) => {
        this.error = "Can't load teams";
        console.error(err);
      },
    });
  }

  //Editing:
  //Copying the origina into the new one.
  editTeam(team: TeamDTO): void {
    //We created a copy of the original team in editingTeam
    this.editingTeam = { ...team };
  }

  deletePlayers(team: string): void{
    this.leagueService.deletePlayersFromTeam(this.selectedLeague, team).subscribe({
      next: () =>{
        this.players = this.players.filter((player) => player.team !== team);
        this.error =null;
        this.loadTeams;
      },
      error: (err) => {
        this.error = "Can't delete the players.";
        console.error(err);
      },
    })
  }

  //Saving the new one.
  saveEditTeam(): void {
    if (!this.editingTeam) return;
    if(!this.editingTeam || !this.editingTeam.name){
      this.error = 'Team must have a valid name';
      return;
    }
    const teamId = this.editingTeam.id;
    if(!teamId){
      this.error = 'The team must have a valid ID';
      return;
    }

    this.leagueService
      .editTeam(this.selectedLeague, teamId, this.editingTeam)
      .subscribe({
        //if the request was correct then:
        next: () => {
          const teamToUpdate = this.editingTeam;
          if (teamToUpdate) {
            const index = this.teams.findIndex(
              (t) => teamId === this.editingTeam!.id
            );
            if (index !== -1) {
              this.teams[index] = {
                id: teamToUpdate.id!,
                name: teamToUpdate.name,
                playerDTOS: teamToUpdate.playerDTOS || [],
                league: teamToUpdate.league!,
              };
              this.loadTeams();
            }
          }
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Unable to save changes', err);
          this.error = 'Unable to save changes';
        },
      });
  }

  // Cancela la edición
  cancelEdit(): void {
    this.editingTeam = null; // Salimos del modo de edición
  }

  createTeam(): void {
    if (this.newTeam.name.trim() === '') {
      this.error = 'The name cannot be empty';
      return;
    }
    this.newTeam.league = this.selectedLeague;
    this.leagueService.createTeam(this.selectedLeague, this.newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.teams.push({ ...this.newTeam }); //Created a copy o the 'old' teams and then added the new team
        this.newTeam = { name: '', league: '', playerDTOS: [] }; //Restarted the form
        this.error = null;
      },
      error: (err) => {
        (this.error = "Can't create the team"), err;
        console.error(err);
      },
    });
  }

  changeLeague(league: string): void {
    this.selectedLeague = league;
    this.loadTeams();
  }
}
