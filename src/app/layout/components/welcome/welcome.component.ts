import {Component} from '@angular/core'
import {LeagueService} from '../../../core/services/league.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export default class WelcomeComponent {
  constructor(public leagueService: LeagueService, private router: Router) { }

  toggleLeague() {
    this.leagueService.toggleLeague()
    this.router.navigate([this.leagueService.currentLeaguePath])
  }
}
