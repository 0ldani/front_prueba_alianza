import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'consultar',
    loadComponent: () =>
      import('./feature/usuario/consultar/consultar.component').then(
        (m) => m.ConsultarComponent
      ),
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./feature/usuario/crear/crear.component').then(
        (m) => m.CrearComponent
      ),
  },
  {
    path: 'actualizar/:id',
    loadComponent: () =>
      import('./feature/usuario/actualizar/actualizar.component').then(
        (m) => m.ActualizarComponent
      ),
  },
];
