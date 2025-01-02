import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private leagues = ['baseball', 'soccer']
  private currentLeagueIndex = 0

  get currentLeaguePath(): string {
    return `/${this.leagues[this.currentLeagueIndex]}`
  }

  get currentLeagueName(): string {
    return this.leagues[this.currentLeagueIndex]
  }

  get nextLeagueName(): string {
    const nextIndex = (this.currentLeagueIndex + 1) % this.leagues.length
    return this.leagues[nextIndex]
  }

  toggleLeague() {
    this.currentLeagueIndex = (this.currentLeagueIndex + 1) % this.leagues.length
  }
}
