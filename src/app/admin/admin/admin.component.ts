import { Component, OnInit, ViewChild } from '@angular/core';
import { Admin } from 'src/app/interface/admin';
import { LogoutModalService } from 'src/app/modals/logout-modal/logout-modal.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  
  accessType: string;
  admin: Admin;
  
  constructor(private logoutService: LogoutModalService , private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  
  year = new Date().getFullYear();
  
  ngOnInit() {  

  }

  logout() {
    this.authService.logout();
  }

}
