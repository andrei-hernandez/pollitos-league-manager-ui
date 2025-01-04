import { Component, OnInit } from '@angular/core';
import { PlayersService } from './services/players.service';
import { Player } from './models/player.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule],
  standalone: true
})
export  default class PlayersComponent implements OnInit {
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
