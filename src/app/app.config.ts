import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Ruta de tu aplicación
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Activar el cambio de detección de zona
    provideRouter(routes),  // Enrutador
    provideAnimationsAsync(),  // Animaciones de Angular
    provideHttpClient(),
    BrowserAnimationsModule,  // Animaciones en el navegador
    MatButtonModule,  // Material Button
    MatTableModule,  // Material Table
    MatInputModule,  // Material Input
    MatCardModule,  // Material Card
    MatPaginatorModule,  // Material Paginator
    MatIconModule,  // Material Icon
    MatFormFieldModule,  // Material Form Field
    MatToolbarModule,  // Material Toolbar
    FlexLayoutModule, provideAnimationsAsync(),  // Flex Layout
  ]
};
