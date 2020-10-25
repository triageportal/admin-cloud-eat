import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { CreateEditRestaurantComponent } from './create-edit-restaurant/create-edit-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

const routes: Routes = [
    {
     path: '', 
     component: RestaurantComponent,
     children: [
       {
         path: 'create-edit-restaurant',
         component: CreateEditRestaurantComponent
       },
       {
         path: 'restaurant-details',
         component: RestaurantDetailsComponent
       },
     ] 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
