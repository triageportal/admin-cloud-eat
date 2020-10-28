import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../clinic/clinic.service';
import { BannerService } from './banner.service';
import { AuthService } from '../../auth/auth.service';
import { LoaderService } from '../loader/loader.service';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banner = {clinic_id: 0, clinicName: ''}
  user: User
  constructor(private clinicService: ClinicService, private bannerService: BannerService, private authService: AuthService, private loader: LoaderService) { }

  ngOnInit() {
    this.user = this.authService.getUser()
    this.authService.userObservable.subscribe(
      result =>{
        if(result) {
          this.user = result;
        } else {
          this.user.clinic_id = 0;
          this.user.clinicName = '';
        }
        
      }
    )
    console.log(this.user);
    
  }

  unassign(){
    this.loader.show()
    this.clinicService.assign(0).subscribe(
      result => {
        if (result) {
          this.authService.assignAccountToUser(0, '');
          this.loader.hide()
        }        
      },
      error => {
        console.log(error);
        this.loader.hide()       
      }
    )
    
  }

}
