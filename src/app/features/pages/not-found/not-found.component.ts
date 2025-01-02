import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LeagueService} from '../../../core/services/league.service';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export default class NotFoundComponent {

  constructor(public leagueService: LeagueService) {
  }

}
