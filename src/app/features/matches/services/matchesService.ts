import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Match} from '../../../core/models/matches.model'
import {catchError, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class MatchService {
  private http = inject(HttpClient)

  create(leagueType: string, match: Match){
    return this.http.post<Match>(`http://localhost:8080/leagues/${leagueType}/match`, match).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred'
        if(error.status === 404){
          errorMessage = 'Team not found'
        }
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  getMatchesByTeam(leagueType: string, teamId: number){
    return this.http.get<Match[]>(`http://localhost:8080/leagues/${leagueType}/match/${teamId}`)
  }

  deleteAll(leagueType: string){
    return this.http.delete(`http://localhost:8080/leagues/${leagueType}/matches`)
  }

}
