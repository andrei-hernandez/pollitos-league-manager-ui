import {inject, Injectable} from '@angular/core'
import { Team } from '../../../core/models/teams.model'
import {HttpClient} from '@angular/common/http'
import {catchError, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private http = inject(HttpClient)

  listTeams(leagueType: string) {
    return this.http.get<Team[]>(`http://localhost:8080/leagues/${leagueType}/team`)
  }

  create(leagueType: string, teamName: Team) {
    return this.http.post<Team>(`http://localhost:8080/leagues/${leagueType}/team`, teamName).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred'
        if(error.status === 400){
          errorMessage = 'Team name required'
        }else if(error.status === 403){
          errorMessage = 'You have reached the maximum limit of teams allowed'
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  getTeamById(leagueType: string, id: number) {
    return this.http.get<Team>(`http://localhost:8080/leagues/${leagueType}/team/${id}`)
  }

  update(leagueType: string, id: number, teamName: Team) {
    return this.http.put<Team>(`http://localhost:8080/leagues/${leagueType}/team/${id}`, teamName).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred'
        if(error.status === 400){
          errorMessage = 'Team name required'
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  deletePlayers(leagueType: string, teamId: number) {
    return this.http.delete(`http://localhost:8080/leagues/${leagueType}/player/${teamId}`)
  }

}
