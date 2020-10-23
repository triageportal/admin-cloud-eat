import { RestaurantService } from './../../../restaurant/restaurant.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { LoaderService } from '../../../modals/loader/loader.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  searchQuery = '';
  minLengthError = false;
  errorMessageToggle = false;
  errorMessage = '';
  restaurants: any[];
  @ViewChild("searchBy") searchBy: ElementRef;
  searchByInstance: any;
  restaurantSearchBy = 'phone';

  constructor(private router: Router, private restaurantService: RestaurantService, private loader: LoaderService) { }

  ngOnInit(): void {
  }

  onSearch () {
    if (this.searchQuery.length >= 3) {
      this.minLengthError = false;
      this.errorMessageToggle = false;
      this.loader.show()
      this.restaurantService.search(this.searchQuery).subscribe(
        result => {
          console.log(result);
          if (result.length > 0) {
            //this.restaurantService.foundrestaurants = result;
            this.restaurants = result;
          } else {
            this.errorMessageToggle = true;
            this.errorMessage = 'No restaurant found'
          }
          this.loader.hide();         
        },
        error => {
          console.log(error);
          this.loader.hide();
          
        }
      )
      //this.router.navigate(['./../restaurant/restaurant-details'])
    } else {
      this.errorMessageToggle = false;
      this.minLengthError = true;
      this.loader.hide();
    }
  }

  setrestaurant(restaurant) {
    this.restaurantService.restaurant = restaurant;
    this.router.navigate(['restaurant'])
  }

}
