import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {TableModule} from 'primeng/table'
import {Button} from 'primeng/button'
import {TeamService} from '../../teams/services/teams.service'
import {Team} from '../../../core/models/teams.model'
import {Player} from '../../../core/models/players.model'
import {Dialog} from 'primeng/dialog'
import {PlayerService} from '../services/players.service'
import {LeagueService} from '../../../core/services/league.service';

@Component({
  selector: 'app-players',
  imports: [
    RouterLink,
    TableModule,
    Button,
    Dialog,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export default class PlayersComponent implements OnInit {

  dialogVisible: boolean = false

  teams: Team[] = []
  players: Player[] = []
  teamId: number = 0

  constructor(private teamService: TeamService, private playerService: PlayerService, private activatedRoute: ActivatedRoute, public leagueService: LeagueService) {
  }

  ngOnInit() {
    this.teamService.listTeams(this.leagueService.currentLeagueName).subscribe(teams => {
      this.teams = teams
    })
  }

  showDialog(id: number) {
    this.dialogVisible = true
    this.teamId = id

    this.playerService.getPlayersByTeam(this.leagueService.currentLeagueName, this.teamId).subscribe(players => {
      this.players = players
    })
  }


}
