import { TriModalInterface } from './../../modals/tri-modal/tri-modal.interface';
import { TriModalService } from 'src/app/modals/tri-modal/tri-modal.service';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AccountService } from '../account.service';
import { LoaderService } from '../../modals/loader/loader.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  account: any;
  @ViewChild("tabs") tabsElement: ElementRef;
  clinicTabs = ['block', 'none', 'none'];
  
  constructor(private router: Router, private authService: AuthService ,private triModalService: TriModalService, private accountService: AccountService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.account = this.accountService.account
  }

  ngAfterViewInit(): void { 
    M.Tabs.init(this.tabsElement.nativeElement);
  }

  tabSwitch(id) {
    this.clinicTabs.fill('none');
    this.clinicTabs[id] = 'block';
  }

  onEdit(account) {
    this.accountService.accountToEdit = account;
    this.router.navigate(['/account/create-edit-account/' + account.id])
  }

  onAddRest(account) {
    this.router.navigate(['/restaurant/create-edit-restaurant/new/' + account.id])
  }

  onDelete(account) {
    this.triModalService.triModalStateSource.next(this.deleteWarning);
    this.triModalService.triModalRespondObservable.pipe(take(1)).subscribe(
      result => {
        if (result == 'delete') {
          console.log(result);
          this.delete(account);
        }
                
      }
    )
  }

  delete(account) {
    this.loader.show();
    this.accountService.delete(account).subscribe(
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
  

  
  onAssign(account) {
    this.loader.show()
    this.accountService.assign(account.id).subscribe(
      result => {
        if (result) {
          this.authService.assignAccountToUser(account.id, account.name);
          this.triModalService.triModalStateSource.next(this.assignSuccess);
        }       
      },
      error => {
        this.tryLater()
      }
    )
  }


  tryLater(){
    this.triModalService.triModalStateSource.next(this.modalTryLater);
  }


  assignSuccess: TriModalInterface = {
    type: 'success', 
    header: 'account Manager', 
    text: ['account was assigned to you',  'You can proceed login to triage portal'], 
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
    text: ['account has been removed'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }

}
