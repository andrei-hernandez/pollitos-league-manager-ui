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
    return this.leagues[this.currentLeagueIndex].charAt(0)
      + this.leagues[this.currentLeagueIndex].slice(1)
  }

  get nextLeagueName(): string {
    const nextIndex = (this.currentLeagueIndex + 1) % this.leagues.length
    return this.leagues[nextIndex].charAt(0) + this.leagues[nextIndex].slice(1)
  }

  toggleLeague() {
    this.currentLeagueIndex = (this.currentLeagueIndex + 1) % this.leagues.length
  }
}
