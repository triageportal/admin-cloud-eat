import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';
import { AuthGuard } from '../auth/auth.guard';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';


const routes: Routes = [
  {
    path: '',
    component: ClinicComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'clinic-details',
        pathMatch: 'full'
      },
      {
        path: 'clinic-details',
        component: ClinicDetailsComponent
      },
      { 
        path: 'create-edit-clinic', 
        loadChildren: () => import('./create-edit-clinic/create-edit-clinic.module').then(m => m.CreateEditClinicModule) 
      },
      { 
        path: 'create-edit-clinic/:id', 
        loadChildren: () => import('./create-edit-clinic/create-edit-clinic.module').then(m => m.CreateEditClinicModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
