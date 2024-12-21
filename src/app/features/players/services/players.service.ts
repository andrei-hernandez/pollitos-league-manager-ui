import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment'; 
import { PlayersModule } from 'src/app/features/players/players.module';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private apiUrl = `${environment.apiUrl}/players`;

  constructor(private http: HttpClient) {}

  getPlayers(idTeam: number): Observable<PlayersModule[]> {
    return this.http.get<PlayersModule[]>(`${this.apiUrl}?idTeam=${idTeam}`);
  }

  createPlayer(player: PlayersModule): Observable<PlayersModule> {
    return this.http.post<PlayersModule>(this.apiUrl, player);
  }

  updatePlayer(id: number, player: PlayersModule): Observable<PlayersModule> {
    return this.http.put<PlayersModule>(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
