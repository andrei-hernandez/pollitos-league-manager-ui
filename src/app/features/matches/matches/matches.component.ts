import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {TableModule} from 'primeng/table'
import {Button} from 'primeng/button'
import {TeamService} from '../../teams/services/teams.service'
import {Team} from '../../../core/models/teams.model'
import {Dialog} from 'primeng/dialog'
import {MatchService} from '../services/matchesService'
import {Match} from '../../../core/models/matches.model'
import {LeagueService} from '../../../core/services/league.service'
import {MessageService} from 'primeng/api'
import {Toast} from 'primeng/toast'

@Component({
  selector: 'app-matches',
  imports: [
    RouterLink,
    TableModule,
    Button,
    Dialog,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export default class MatchesComponent implements OnInit {

  dialogVisible: boolean = false

  teams: Team[] = []
  matches: Match[] = []
  teamId: number = 0

  constructor(private messageService: MessageService, private teamService: TeamService, private matchService: MatchService, public leagueService: LeagueService) {
  }

  ngOnInit() {
    this.teamService.listTeams(this.leagueService.currentLeagueName).subscribe(teams => {
      this.teams = teams
    })
  }

  showDialog(id: number) {
    this.dialogVisible = true
    this.teamId = id

    this.matchService.getMatchesByTeam(this.leagueService.currentLeagueName, this.teamId).subscribe(matches => {
      this.matches = matches
    })
  }

  deleteAll() {
    this.matchService.deleteAll(this.leagueService.currentLeagueName).subscribe({
      error: (error) => {
        if (error.status === 200) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Matches deleted successfully'})
        }else if(error.status === 404) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Matches not found'})
        }
      }
    })
  }

}
