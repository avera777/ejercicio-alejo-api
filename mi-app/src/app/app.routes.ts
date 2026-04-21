import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Gastos } from './pages/gastos/gastos';
import { Ingresos } from './pages/ingresos/ingresos';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'gastos', component: Gastos },
  { path: 'ingresos', component: Ingresos }
];