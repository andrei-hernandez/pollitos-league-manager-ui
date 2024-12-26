import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/features/players/services/players.service';
import { Player } from 'src/app/features/players/models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
  imports: [CommonModule, RouterModule, FormsModule], 
  standalone: true
})
export class CreatePlayerComponent implements OnInit {
  player: Player = { idPlayer: 0, namePlayer: '', idLeague: 0, idTeam: 0 };
  successMessage: string = '';  

  constructor(
    private playersService: PlayersService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  createPlayer(): void {
    this.playersService.createPlayer(this.player).subscribe({
      next: (data) => {
        console.log('Jugador creado:', data);
        this.successMessage = 'Jugador registrado con éxito'; 
        setTimeout(() => {
          this.router.navigate(['']); 
        }, 2000);
      },
      error: (err) => {
        console.error('Error al crear el jugador:', err);
        this.successMessage = ''; 
      },
    });
  }
}
