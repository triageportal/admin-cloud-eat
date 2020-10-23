import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ClinicCardComponent } from './admin-dashboard/clinic-card/clinic-card.component';


@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, ClinicCardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
