import {Component, OnInit} from '@angular/core'
import {RouterLinkWithHref, RouterLinkActive, Router} from '@angular/router'
import {MenuItem} from 'primeng/api'
import {LeagueService} from '../../../core/services/league.service'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined

  constructor(private router: Router, public leagueService: LeagueService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        styleClass: 'icon-home',
      },
      {
        label: 'Teams',
        icon: 'pi pi-users',
        route: '/teams'
      },
      {
        label: 'Players',
        icon: 'pi pi-user'
      },
      {
        label: 'Matches',
        icon: 'pi pi-sitemap'
      }
    ]
  }


}
