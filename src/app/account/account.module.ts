import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { CreateEditAccountComponent } from './create-edit-account/create-edit-account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccountComponent, CreateEditAccountComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
