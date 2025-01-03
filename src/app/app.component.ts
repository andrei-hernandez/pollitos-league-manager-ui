// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importar el módulo de rutas

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Nota: Si no utilizas módulos, importa CommonModule y FormsModule si necesitas
  // pipes y directivas (ngIf, ngFor). Por ejemplo:
  imports: [RouterModule]
})

export class AppComponent {
}
