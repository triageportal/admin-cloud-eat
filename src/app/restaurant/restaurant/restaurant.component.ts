import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private authService: AuthService) {}
  
  year = new Date().getFullYear();
  
  ngOnInit() {  

  }

  logout() {
    this.authService.logout();
  }

}
