import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditClinicComponent } from './create-edit-clinic.component';

const routes: Routes = [{ path: '', component: CreateEditClinicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditClinicRoutingModule { }
