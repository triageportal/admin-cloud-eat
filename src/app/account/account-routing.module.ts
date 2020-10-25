import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { CreateEditAccountComponent } from './create-edit-account/create-edit-account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent,
    children:[
      {
        path: 'create-edit-account',
        component: CreateEditAccountComponent
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
