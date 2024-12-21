import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { TeamsModule } from 'src/app/features/teams/teams.module'; 

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = `${environment.apiUrl}/teams`;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<TeamsModule[]> {
    return this.http.get<TeamsModule[]>(this.apiUrl);
  }

  createTeam(team: TeamsModule): Observable<TeamsModule> {
    return this.http.post<TeamsModule>(this.apiUrl, team);
  }

  updateTeam(id: number, team: TeamsModule): Observable<TeamsModule> {
    return this.http.put<TeamsModule>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
