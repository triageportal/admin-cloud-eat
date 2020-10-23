import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { domain } from '../data/domain';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  domain = domain;
  restaurantToEdit: any;
  foundrestaurants: any[];
  restaurant: any;

constructor(private authService: AuthService, private http: HttpClient) { }

  get(searchQuery) {
    const token = this.authService.getToken();
    return this.http.get<any>(this.domain + 'restaurant/search/' + searchQuery + '?token=' + token)
  }

  assign(id) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'assign-restaurant?token=' + token, {id: id}, {headers: headers})
  }



  update(restaurant) {
    const token = this.authService.getToken();
    restaurant['contactName'] = this.restaurantToEdit.contactName;
    restaurant['contactEmail'] = this.restaurantToEdit.contactEmail;
    console.log(restaurant);
    console.log(this.restaurantToEdit);
    
    const body = {restaurant: restaurant};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.patch<any>(this.domain + 'update-restaurant?token=' + token, body, {headers: headers})
  }

  suspend (restaurant) {
    const token = this.authService.getToken();
    const body = {id: restaurant.id, action: 'suspend'};
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put<any>(this.domain + 'restaurant?token=' + token, body, {headers: headers})
  }

  delete(restaurant) {
    const token = this.authService.getToken();
    return this.http.delete<any>(this.domain + 'restaurant?id=' + restaurant.id + '&token=' + token);
  }

  create(restaurant, restaurantId) {
    console.log(restaurant);
    
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    if (restaurantId) {
      restaurant['id'] = restaurantId;
      restaurant['contactName'] = this.restaurantToEdit.contactName;
      restaurant['contactEmail'] = this.restaurantToEdit.contactEmail;
      return this.http.patch<any>(this.domain + 'restaurant?token=' + token, restaurant);
    } else {
      return this.http.post<any>(this.domain + 'restaurant?token=' + token, restaurant);
    }  
  }

  search(keyword) {
    const token = this.authService.getToken();
    console.log(keyword);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let params = new HttpParams()
        .set('keyword', keyword)
        .set('token', token);
    return this.http.get<any[]>(this.domain + 'restaurant', {params: params})
  }

}
