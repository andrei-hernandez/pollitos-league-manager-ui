import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Player } from '../../../core/models/players.model'
import {catchError, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private http = inject(HttpClient)

  create(leagueType: string, player: Player) {
    return this.http.post<Player>(`http://localhost:8080/leagues/${leagueType}/player`,player).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred'
        if(error.status === 400){
          errorMessage = 'Player name required'
        }else if(error.status === 404){
          errorMessage = 'Team not found'
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  getPlayerById(leagueType: string, id: number) {
    return this.http.get<Player>(`http://localhost:8080/leagues/${leagueType}/player/${id}`)
  }

  getPlayersByTeam(leagueType: string, teamId: number){
    return this.http.get<Player[]>(`http://localhost:8080/leagues/${leagueType}/players/${teamId}`)
  }

  update(leagueType: string, id: number, player: Player) {
    return this.http.put<Player>(`http://localhost:8080/leagues/${leagueType}/player/${id}`,player).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred'
        if(error.status === 400){
          errorMessage = 'Player name required'
        }else if(error.status === 404){
          errorMessage = 'Team not found'
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }
}
