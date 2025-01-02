import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueModel } from '../models/league.model'; 

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private apiUrl = 'http://localhost:8080/api/leagues'; 

  constructor(private http: HttpClient) {}

  
  getAllLeagues(): Observable<LeagueModel[]> {
    return this.http.get<LeagueModel[]>(this.apiUrl);
  }
}
