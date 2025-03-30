import { Routes } from '@angular/router';
import { BaseComponent } from '../layout/base/base.component';

export const PAGES: Routes = [
  {
    path: '',
    component:BaseComponent,
    children:[
        {
            path:'',
            loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
        }
    ]
  },
];
