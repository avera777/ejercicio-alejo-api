import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Gastos } from './pages/gastos/gastos';
import { Ingresos } from './pages/ingresos/ingresos';
import { Login } from './pages/login/login';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'gastos',
    component: Gastos,
    canActivate: [authGuard]
  },

  {
    path: 'ingresos',
    component: Ingresos,
    canActivate: [authGuard]
  }

];