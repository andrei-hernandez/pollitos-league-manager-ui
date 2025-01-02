import {Component, OnInit} from '@angular/core'
import {FloatLabel} from "primeng/floatlabel"
import {InputText} from "primeng/inputtext"
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {ActivatedRoute, Router, RouterLink} from "@angular/router"
import {Player} from '../../../core/models/players.model'
import {PlayerService} from '../services/players.service'
import {LeagueService} from '../../../core/services/league.service'
import {MessageService} from 'primeng/api'
import {Toast} from 'primeng/toast'

@Component({
  selector: 'app-create-player',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css'
})
export default class CreatePlayerComponent implements OnInit {

  form?: FormGroup
  player?: Player

  constructor(private fb: FormBuilder, private router: Router, private playerService: PlayerService, private activatedRoute: ActivatedRoute, public leagueService: LeagueService, private messageService:MessageService) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.playerService.getPlayerById(this.leagueService.currentLeagueName, parseInt(id))
        .subscribe(player => {
          this.player = player
          this.form = this.fb.group({
            name: [player.name, [Validators.required]],
            teamId: [player.teamId, [Validators.required]],
          })
        })
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        teamId: ['', Validators.required],
      })
    }
  }

  savePlayer() {
    const playerForm = this.form!.value
    if(this.player){
      this.playerService.update(this.leagueService.currentLeagueName, this.player.id, playerForm).subscribe({
        next: () => {
          this.router.navigate([this.leagueService.currentLeaguePath, 'players'])
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Failed to update player', detail: err.message})
        }
      })
    }else{
      this.playerService.create(this.leagueService.currentLeagueName, playerForm).subscribe({
        next: () => {
          this.router.navigate([this.leagueService.currentLeaguePath, 'players'])
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Failed to create player', detail: err.message})
        }
      })
    }
  }

}
