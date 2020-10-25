import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { CreateEditRestaurantComponent } from './create-edit-restaurant/create-edit-restaurant.component';


@NgModule({
  declarations: [RestaurantComponent, RestaurantDetailsComponent, CreateEditRestaurantComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
