import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment'; 
import { Match } from 'src/app/features/matches/models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private apiUrl = `${environment.apiUrl}Match`;

  constructor(private http: HttpClient) {}

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.apiUrl + "/", match);
  }

  getMatches(teamId: number): Observable<Match[]> {
    const url = `${this.apiUrl}/team/${teamId}`;
    return this.http.get<Match[]>(url);
  }
  deleteMatches(idMatch: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/matches`);
  }
 
}
