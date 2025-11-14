// src/app/app.routes.ts

import { Routes } from '@angular/router';

// Componentes de la app
import { CatalogoComponent } from './catalogo/catalogo';
import { CarritoComponent } from './carrito/carrito';

// Auth
import { LoginComponent } from './auth/login';
import { ForgotPasswordComponent } from './auth/forgot-password';
import { RegisterComponent } from './auth/register';

export const routes: Routes = [
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },

  // App principal
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },

  // Al entrar a la app -> Crear cuenta
  { path: '', redirectTo: 'register', pathMatch: 'full' },

  // Rutas no encontradas -> Crear cuenta
  { path: '**', redirectTo: 'register' },
];
