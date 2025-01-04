import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment'; 
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private apiUrl = `${environment.apiUrl}Player/`;

  constructor(private http: HttpClient) {}

  getPlayers(idTeam: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}${idTeam}`);

  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}${id}`, player);
  }
  searchPlayers(idTeam: number, idLeague : number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}${idTeam}/${idLeague}`);


  }

}
