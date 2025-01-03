// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TeamDTO } from '../models/team.model';
import { PlayerDTO } from '../models/player.model';
import { MatchDTO } from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createTeam(leagueName: string, team: TeamDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${leagueName}/team`, team);
  }

  createPlayer(
    leagueName: string,
    teamName: string,
    player: PlayerDTO
  ): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/${leagueName}/${teamName}/player`,
      player
    );
  }

  createMatch(leagueName: string, match: MatchDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${leagueName}/match`, match);
  }

  getAllTeams(leagueName: string): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(`${this.baseUrl}/${leagueName}/teams`);
  }

  getAllPlayers(
    leagueName: string,
    teamName: string
  ): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(`${this.baseUrl}/${leagueName}/team/${teamName}/players`);
  }

  getPlayerByTeam(
    leagueName: string,
    teamName: string
  ): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(`${this.baseUrl}/${leagueName}/${teamName}`);
  }

  getMatchesByLeague(leagueName: string): Observable<MatchDTO[]> {
    return this.http.get<MatchDTO[]>(`${this.baseUrl}/${leagueName}/matches`);
  }

  editPlayer(leagueName: string, teamName: string, playerID: number, playerDTO: PlayerDTO): Observable<string>{
    return this.http.put<string>(`${this.baseUrl}/${leagueName}/${teamName}/player/${playerID}`, playerDTO);
  }

  editTeam(leagueName: string, teamID: number, teamDTO: TeamDTO): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${leagueName}/team/${teamID}`, teamDTO);
  }

  deleteMatches(leagueName:string){
    return this.http.delete(`${this.baseUrl}/${leagueName}/delete/matches`);
  }

  deletePlayersFromTeam(leagueName:string, teamName: string){
    return this.http.delete(`${this.baseUrl}/${leagueName}/team/${teamName}/players`);
  }


  deleteTeam(leagueName: string, teamID: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/${leagueName}/team/${teamID}`
    );
  }

  //Testing
  getSaludo(): Observable<{mensaje: string}>{    
    return this.http.get<{mensaje:string}>(`${this.baseUrl}/api/saludo`);
  }

}