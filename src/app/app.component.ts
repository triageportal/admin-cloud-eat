import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LogoutModalService } from './modals/logout-modal/logout-modal.service';
import { Admin } from './interface/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  
  isLoggedIn = false;
  accessType: string;
  admin: Admin;
  
  constructor(private logoutService: LogoutModalService , private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  

  
  ngOnInit() {  
    if (this.authService.isLoggedIn()) {
      this.logoutService.setLogoutTimer();
      this.router.navigate(['/admin']);
    } else {   
      this.router.navigate(['/login']);
    };  
  }
}