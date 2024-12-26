import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/features/players/services/players.service';
import { Player } from 'src/app/features/players/models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
  imports: [CommonModule, RouterModule, FormsModule], 
  standalone: true
})
export class EditPlayerComponent implements OnInit {
  player: Player = { idPlayer: 0, namePlayer: '', idLeague: 0, idTeam: 0 }; 
  playerId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPlayer(this.playerId);
  }

  loadPlayer(playerId: number): void {
    this.playersService.getPlayers(playerId).subscribe({
      next: (data) => {
        this.player = data.find(p => p.idPlayer === this.playerId) || { idPlayer: 0, namePlayer: '', idLeague: 0, idTeam: 0 };
        if (!this.player.idPlayer) {
          console.error('Jugador no encontrado');
        }
      },
      error: (err) => console.error('Error al cargar los jugadores:', err),
    });
  }

  updatePlayer(): void {
    this.playersService.updatePlayer(this.player.idPlayer, this.player).subscribe({
      next: (updatedPlayer) => {
        console.log('Jugador actualizado:', updatedPlayer);
        
      },
      error: (err) => console.error('Error al actualizar el jugador:', err),
    });
  }
}
