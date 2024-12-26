import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/features/players/services/players.service';
import { Player } from 'src/app/features/players/models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
    imports: [CommonModule, RouterModule, FormsModule], 
    standalone: true

})
export class PlayersComponent implements OnInit {
  players: Player[] = []; 
  filteredPlayers: Player[] = []; 
  teamId: number = 2; 
  searchPlayerId: number = 0;

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playersService.getPlayers(this.teamId).subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = data;
      },
      error: (err) => console.error('Error al cargar los jugadores:', err),
    });
  }

  searchPlayer(searchTeam: number): void {
    this.playersService.getPlayers(searchTeam).subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = data;
      },
      error: (err) => console.error('Error al cargar los jugadores:', err),
    });
  }
}
