import {Component, OnInit} from '@angular/core'
import {FloatLabel} from "primeng/floatlabel"
import {InputText} from "primeng/inputtext"
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {Router, RouterLink} from "@angular/router"
import {Match} from '../../../core/models/matches.model'
import {MatchService} from '../services/matchesService'
import {LeagueService} from '../../../core/services/league.service'
import {MessageService} from 'primeng/api'
import {Toast} from 'primeng/toast'

@Component({
  selector: 'app-create-match',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.css'
})
export default class CreateMatchComponent implements OnInit {

  form?: FormGroup
  match?: Match

  constructor(private messageService: MessageService, private fb: FormBuilder, private matchService: MatchService, private router: Router, public leagueService: LeagueService) {}

  ngOnInit() {
    this.form = this.fb.group({
      teamIdA: ['', [Validators.required]],
      teamIdB: ['', [Validators.required]],
      scoreTeamA: ['', [Validators.required]],
      scoreTeamB: ['', [Validators.required]]
    })
  }

  saveMatch() {
    const matchForm = this.form!.value

    this.matchService.create(this.leagueService.currentLeagueName, matchForm).subscribe({
      next: () => {
        this.router.navigate([this.leagueService.currentLeaguePath, 'matches'])
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed to create', detail: err.message})
      }
    })
  }

}

