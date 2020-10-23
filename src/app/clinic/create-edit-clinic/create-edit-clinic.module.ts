import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEditClinicRoutingModule } from './create-edit-clinic-routing.module';
import { CreateEditClinicComponent } from './create-edit-clinic.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateEditClinicComponent],
  imports: [
    CommonModule,
    CreateEditClinicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateEditClinicModule { }
