import { TriModalInterface } from './../../modals/tri-modal/tri-modal.interface';
import { TriModalService } from 'src/app/modals/tri-modal/tri-modal.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClinicService } from '../clinic.service';
import { Clinic } from 'src/app/interface/clinic.interface';
import * as M from 'materialize-css';
import { LoaderService } from '../../modals/loader/loader.service';
import { AuthService } from '../../auth/auth.service';
import { BannerService } from '../../modals/banner/banner.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent implements OnInit {

  clinic: Clinic;
  @ViewChild("tabs") tabsElement: ElementRef;
  clinicTabs = ['block', 'none', 'none'];
  
  constructor(private router: Router, private authService: AuthService ,private triModalService: TriModalService, private clinicService: ClinicService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic
  }

  ngAfterViewInit(): void { 
    M.Tabs.init(this.tabsElement.nativeElement);
  }

  onEdit(clinic) {
    this.clinicService.clinicToEdit = clinic;
    this.router.navigate(['/clinic/create-edit-clinic/' + clinic.id])
  }

  onDelete(clinic) {
    this.triModalService.triModalStateSource.next(this.deleteWarning);
    this.triModalService.triModalRespondObservable.pipe(take(1)).subscribe(
      result => {
        if (result == 'delete') {
          console.log(result);
          this.delete(clinic);
        }
                
      }
    )
  }

  delete(clinic: Clinic) {
    this.loader.show();
    this.clinicService.delete(clinic).subscribe(
      result => {
        this.loader.hide();
        this.triModalService.triModalStateSource.next(this.deleteSuccess);
        this.router.navigate(['/'])
      },
      error => {
        console.log(error);
        this.loader.hide();
        if (error.status == 401) {
          this.authService.logout();
        } else {
          this.tryLater();
        }
      }
    )    
  }
  

  
  onAssign(clinic) {
    this.loader.show()
    this.clinicService.assign(clinic.id).subscribe(
      result => {
        if (result) {
          this.authService.assignAccountToUser(clinic.id, clinic.name);
          this.triModalService.triModalStateSource.next(this.assignSuccess);
        }       
      },
      error => {
        this.tryLater()
      }
    )
  }

  tabSwitch(id) {
    this.clinicTabs.fill('none');
    this.clinicTabs[id] = 'block';
  }

  tryLater(){
    this.triModalService.triModalStateSource.next(this.modalTryLater);
  }


  assignSuccess: TriModalInterface = {
    type: 'success', 
    header: 'Clinic Manager', 
    text: ['Clinic was assigned to you',  'You can proceed login to triage portal'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }

  deleteWarning: TriModalInterface = {
    type: 'warning', 
    header: 'Attention', 
    text: ['Are you sure?'], 
    buttons: [{name: 'delete', class: ['indigo', 'lighten-1']}, {name: 'cancel', class: ['red', 'accent-2']}],
    state: 'open'
  }
  
  modalTryLater: TriModalInterface = {
    type: 'warning', 
    header: 'Sorry', 
    text: ['Something went wrong. Please try later'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }

  deleteSuccess: TriModalInterface = {
    type: 'success', 
    header: 'Success', 
    text: ['Clinic has been removed'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }
  
}
