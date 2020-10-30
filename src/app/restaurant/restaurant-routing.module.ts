import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { CreateEditRestaurantComponent } from './create-edit-restaurant/create-edit-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HoursComponent } from './hours/hours.component';

const routes: Routes = [
    {
     path: '', 
     component: RestaurantComponent,
     children: [
       {
         path: 'restaurant-details',
         component: RestaurantDetailsComponent
       },
       {
         path: 'restaurant-hours',
         component: HoursComponent
       },
       {
        path: 'create-edit-restaurant',
        component: CreateEditRestaurantComponent
      },
      {
        path: 'create-edit-restaurant/:action/:id',
        component: CreateEditRestaurantComponent
      },
     ] 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
