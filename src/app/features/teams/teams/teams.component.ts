import {Component, OnInit} from '@angular/core'
import {TableModule} from 'primeng/table'
import {RouterLink} from '@angular/router'
import {TeamService} from '../services/teams.service'
import {Team} from '../../../core/models/teams.model'
import {LeagueService} from '../../../core/services/league.service'
import {MessageService} from 'primeng/api'
import {Toast} from 'primeng/toast'

@Component({
  selector: 'app-teams',
  imports: [TableModule, RouterLink, Toast],
  providers: [MessageService],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export default class TeamsComponent implements OnInit {

  constructor(private messageService: MessageService, private teamService: TeamService, public leagueService: LeagueService) {
  }

  teams: Team[] = []

  ngOnInit() {
    this.teamService.listTeams(this.leagueService.currentLeagueName).subscribe(teams => {
      this.teams = teams
    })

  }

  deletePlayers(teamId: number) {
    this.teamService.deletePlayers(this.leagueService.currentLeagueName, teamId).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Players deleted successfully'})
      },
      error: (error) =>{
        if(error.status === 404){
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Players not found'})
        }
      }

    })
  }

}
