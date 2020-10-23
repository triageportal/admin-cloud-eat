import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic/clinic.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';


@NgModule({
  declarations: [ClinicComponent, ClinicDetailsComponent],
  imports: [
    CommonModule,
    ClinicRoutingModule
  ]
})
export class ClinicModule { }
