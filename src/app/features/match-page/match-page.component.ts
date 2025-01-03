import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../core/services/league.service';
import { TeamDTO } from '../../core/models/team.model';
import { MatchDTO } from '../../core/models/match.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css'],
})
export class MatchesComponent implements OnInit {
  teams: TeamDTO[] = []; // Lista de equipos
  matches: MatchDTO[] = []; // Lista de partidos
  filteredTeams: TeamDTO[] = [];
  //Created a model of the newMatch
  newMatch: MatchDTO = {
    teamDTO1: { id: undefined, name: '', league: '', playerDTOS: [] },
    teamDTO2: { id: undefined, name: '', league: '', playerDTOS: [] },
    scoreTeam1: 0,
    scoreTeam2: 0,
  };
  error: string | null = null;
  selectedLeague: string = 'soccerleague';

  showMatches: MatchDTO[] | null = null;

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.leagueService.getAllTeams(this.selectedLeague).subscribe({
      next: (response) => {
        this.teams = response;
        this.filteredTeams = this.teams.filter((team)=>team.league === this.selectedLeague);
    },
      error: (err) => (this.error = 'Error al cargar los equipos'),
    });
  }

  loadMatches(): void {
    
    this.leagueService.getMatchesByLeague(this.selectedLeague).subscribe({
      next: (matches) => {
        console.log('Matches received:', matches);
        this.matches = matches;
        this.showMatches = {...matches};
      },
      error: (err) => {
        console.error("Couldn't load the matches :", err);
        this.error = "Couldn't load the matches";
      },
    });
  }

  get filteredMatches(): MatchDTO[]{
    return this.matches.filter((match) => match.teamDTO1.league === this.selectedLeague);
  }


  createMatch(): void {
    if (!this.newMatch.teamDTO1 || !this.newMatch.teamDTO2) {
      this.error = 'Select both teams.';
      return;
    }

    this.leagueService
      .createMatch(this.selectedLeague, this.newMatch)
      .subscribe({
        next: () => {
         this.loadMatches();
          this.newMatch = {
            teamDTO1: { id: 0, name: '', league: '', playerDTOS: [] },
            teamDTO2: { id: 0, name: '', league: '', playerDTOS: [] },
            scoreTeam1: 0,
            scoreTeam2: 0,
          };
        },
        error: ((err) => {
          this.error = "Can\'t create matches";
          console.error(err);
        }),
      });
  }

  deleteMatches(leagueName: string): void {
    this.leagueService.deleteMatches(this.selectedLeague).subscribe({
      next: () => {
        this.matches = this.matches.filter((match) => match.teamDTO1.league !== leagueName);
        this.error = null;
      },
      error: (err) => {
        (this.error = "Can't delete matches"), err;
        console.error(err);
      },
    });
  }

  changeLeague(league: string): void {
    this.selectedLeague = league;
    this.loadTeams();
    this.loadMatches();
  }
}
