import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CarritoIndicadorComponent } from './carrito/carrito-indicador.component';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE para *ngIf, ng-template, etc.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,            // 👈 aquí activamos *ngIf, ng-template, etc.
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CarritoIndicadorComponent,
  ],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="nav-logo">
          °❀⋆.ೃ࿔*:･°❀⋆.ೃ࿔*:･
        </a>

        <div class="nav-links">
          <!-- Menú principal: solo se muestra si showMainMenu es true -->
          <ng-container *ngIf="showMainMenu; else authLinks">
            <a
              routerLink="/catalogo"
              routerLinkActive="active"
              class="nav-link"
            >
              Catálogo
            </a>

            <a
              routerLink="/carrito"
              routerLinkActive="active"
              class="nav-link"
            >
              Carrito
            </a>

            <a
              routerLink="/login"
              routerLinkActive="active"
              class="nav-link"
            >
              Login
            </a>
          </ng-container>

          <!-- En pantallas de auth solo mostramos Login / Crear cuenta -->
          <ng-template #authLinks>
            <a
              routerLink="/login"
              routerLinkActive="active"
              class="nav-link"
            >
              Login
            </a>
            <a
              routerLink="/register"
              routerLinkActive="active"
              class="nav-link"
            >
              Crear cuenta
            </a>
          </ng-template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <!-- Indicador de carrito solo si no estamos en pantallas de auth -->
    <app-carrito-indicador *ngIf="showMainMenu"></app-carrito-indicador>
  `,
})
export class AppComponent {
  showMainMenu = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;

        const esAuth =
          url.startsWith('/login') ||
          url.startsWith('/register') ||
          url.startsWith('/forgot');

        // si es pantalla de auth, ocultamos catálogo / carrito
        this.showMainMenu = !esAuth;
      });
  }
}
