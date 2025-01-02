import {Component, OnInit} from '@angular/core'
import {FloatLabel} from 'primeng/floatlabel'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {InputText} from 'primeng/inputtext'
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {TeamService} from '../services/teams.service'
import {Team} from '../../../core/models/teams.model'
import {LeagueService} from '../../../core/services/league.service'
import {MessageService} from 'primeng/api'
import {Toast} from 'primeng/toast'

@Component({
  selector: 'app-create-team',
  imports: [
    FloatLabel,
    FormsModule,
    InputText,
    RouterLink,
    ReactiveFormsModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export default class CreateTeamComponent implements OnInit {

  form?: FormGroup
  team?: Team

  constructor(private teamService: TeamService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, public leagueService: LeagueService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.teamService.getTeamById(this.leagueService.currentLeagueName, parseInt(id))
        .subscribe(team => {
          this.team = team
          this.form = this.fb.group({
            name: [team.name, [Validators.required]]
          })
        })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
      })
    }
  }

  saveTeam() {
    const teamForm = this.form!.value
    if (this.team) {
      this.teamService.update(this.leagueService.currentLeagueName, this.team.id, teamForm).subscribe({
        next: () => {
          this.router.navigate([this.leagueService.currentLeaguePath,'teams'])
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Failed to update team', detail: err.message})
        }
      })
    } else {
      this.teamService.create(this.leagueService.currentLeagueName, teamForm).subscribe({
        next: () => {
          this.router.navigate([this.leagueService.currentLeaguePath, 'teams'])
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Failed to create team', detail: err.message})
        }
      })

    }
  }

}
