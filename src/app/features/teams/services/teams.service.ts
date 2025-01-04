import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = `${environment.apiUrl}Team/`;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}${id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getTeamsbyLeague(idLeague: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}league${idLeague}`);

  }
}
