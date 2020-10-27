import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { CreateEditRestaurantComponent } from './create-edit-restaurant/create-edit-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursComponent } from './hours/hours.component';


@NgModule({
  declarations: [RestaurantComponent, RestaurantDetailsComponent, CreateEditRestaurantComponent, HoursComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantModule { }
