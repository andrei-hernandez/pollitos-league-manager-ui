import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/features/players/services/players.service';
import { Player } from 'src/app/features/players/models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule], 
  standalone: true
})
export class EditPlayerComponent implements OnInit {
  player: Player = { idPlayer: 0, namePlayer: '', idLeague: 0, idTeam: 0 };
  playerId: number = 0;
  successEditMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerId = +id;
      this.loadPlayer(this.playerId);
    } else {
      console.error('ID de jugador no válido en la URL');
      this.router.navigate(['/players']);
    }
  }

  loadPlayer(playerId: number): void {
    this.playersService.getPlayers(1).subscribe({
      next: (data) => {
        const foundPlayer = data.find(p => p.idPlayer === playerId);
        if (foundPlayer) {
          this.player = foundPlayer;
          console.log('Jugador encontrado:', this.player);
        } else {
          console.error('Jugador no encontrado');
          this.router.navigate(['/players']);
        }
      },
      error: (err) => console.error('Error al cargar los jugadores:', err),
    });
  }

  updatePlayer(): void {
    this.playersService.updatePlayer(this.player.idPlayer, this.player).subscribe({
      next: () => {
        this.successEditMessage = 'Jugador editado con éxito.';
        console.log(this.successEditMessage);

       
        setTimeout(() => {
          this.successEditMessage = null;
          this.router.navigate(['/Players']);
        }, 3000);
      },
      error: (err) => console.error('Error al actualizar el jugador:', err),
    });
  }
}
