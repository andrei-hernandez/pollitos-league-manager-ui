import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/features/players/services/players.service';
import { Player } from 'src/app/features/players/models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatButtonModule],
  standalone: true
})
export class PlayersComponent implements OnInit {
  players: Player[] = []; 
  filteredPlayers: Player[] = []; 
  teamId: number = 1; 
  searchPlayerId: number = 0;

  displayedColumns: string[] = ['idPlayer', 'namePlayer', 'idLeague', 'idTeam', 'actions'];

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    let idLeague = localStorage.getItem('selectedLeagueId');
      const idLeagueNumber = Number(idLeague);
    this.playersService.getPlayers(idLeagueNumber).subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = data;
      },
      error: (err) => console.error('Error al cargar los jugadores:', err),
    });
  }

  searchPlayer(searchTeam: number): void {
    let idLeague = localStorage.getItem('selectedLeagueId');
    const idLeagueNumber = Number(idLeague);
    this.playersService.searchPlayers(searchTeam, idLeagueNumber).subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = data;
      },
      error: (err) => console.error('No se hayaron jugadores:', err),
    });
  }
}
