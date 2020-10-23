import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  constructor(private authService: AuthService, ) {}
  

  
  ngOnInit() {  

  }

  logout() {
    this.authService.logout();
  }

}
