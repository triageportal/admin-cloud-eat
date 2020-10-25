import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  constructor(private authService: AuthService) {}
  
  year = new Date().getFullYear();
  
  ngOnInit() {  

  }

  logout() {
    this.authService.logout();
  }

}
