import { ClinicService } from './../../../clinic/clinic.service';
import { Clinic } from './../../../interface/clinic.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { LoaderService } from '../../../modals/loader/loader.service';
@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {
  searchQuery = '';
  minLengthError = false;
  errorMessageToggle = false;
  errorMessage = '';
  clinics: Clinic[];
  @ViewChild("searchBy") searchBy: ElementRef;
  searchByInstance: any;

  constructor(private router: Router, private clinicService: ClinicService, private loader: LoaderService) { }

  ngOnInit(): void {
  }

  onSearch () {
    if (this.searchQuery.length >= 3) {
      this.minLengthError = false;
      this.errorMessageToggle = false;
      this.loader.show()
      this.clinicService.search(this.searchQuery).subscribe(
        result => {
          console.log(result);
          if (result.length > 0) {
            //this.clinicService.foundClinics = result;
            this.clinics = result;
          } else {
            this.errorMessageToggle = true;
            this.errorMessage = 'No clinic found'
          }
          this.loader.hide();         
        },
        error => {
          console.log(error);
          this.loader.hide();
          
        }
      )
      //this.router.navigate(['./../clinic/clinic-details'])
    } else {
      this.errorMessageToggle = false;
      this.minLengthError = true;
      this.loader.hide();
    }
  }

  setClinic(clinic) {
    this.clinicService.clinic = clinic;
    this.router.navigate(['clinic'])
  }

/*   ngAfterViewInit(): void { 
    M.Dropdown.init(this.searchBy.nativeElement, {alignment: 'right'});
    this.searchByInstance = M.Dropdown.getInstance(this.searchBy.nativeElement);
  } */

}
