import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  
  
  constructor(private authService: AuthService) {}
  
  year = new Date().getFullYear();
  
  ngOnInit() {  

  }

  logout() {
    this.authService.logout();
  }

}
