// src/app/app.component.ts
import { Component } from '@angular/core';
import { LeagueService } from './core/services/league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Nota: Si no utilizas módulos, importa CommonModule y FormsModule si necesitas
  // pipes y directivas (ngIf, ngFor). Por ejemplo:
  imports: [CommonModule]
})
export class AppComponent {
  mensajeBackend: string | null = null;

  constructor(private leagueService: LeagueService) {}

  // obtenerSaludo(): void {
  //   this.leagueService.crea().subscribe({
  //     next: (data) => {
  //       // data podría ser { mensaje: 'Hola desde el backend' }
  //       this.mensajeBackend = data.mensaje;
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener saludo:', error);
  //     }
  //   });
  // }
}
