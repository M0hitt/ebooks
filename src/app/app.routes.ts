import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES),
        canActivate:[loginGuard]
      },
      { path: '**', redirectTo: 'auth/login' }
];
