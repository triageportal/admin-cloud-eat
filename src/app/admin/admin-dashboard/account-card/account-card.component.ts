import { AccountService } from './../../../account/account.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { LoaderService } from '../../../modals/loader/loader.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  searchQuery = '';
  minLengthError = false;
  errorMessageToggle = false;
  errorMessage = '';
  accounts = [
    {
      first_name: 'test',
      last_name: 'test',
      position: 'test',
      email: 'test',
      phone: 'test',
      id: 1
    },
    {
      first_name: 'test',
      last_name: 'test',
      position: 'test',
      email: 'test',
      phone: 'test',
      id: 2
    },
  ];
  @ViewChild("searchBy") searchBy: ElementRef;
  searchByInstance: any;
  accountSearchBy = 'email';
  

  constructor(private router: Router, private accountService: AccountService, private loader: LoaderService) { }

  ngOnInit(): void {
  }

  onSearch () {
    if (this.searchQuery.length >= 3) {
      this.minLengthError = false;
      this.errorMessageToggle = false;
      this.loader.show()
      this.accountService.search(this.searchQuery).subscribe(
        result => {
          console.log(result);
          if (result.length > 0) {
            //this.accountService.foundaccounts = result;
            this.accounts = result;
          } else {
            this.errorMessageToggle = true;
            this.errorMessage = 'No account found'
          }
          this.loader.hide();         
        },
        error => {
          console.log(error);
          this.loader.hide();
          
        }
      )
      //this.router.navigate(['./../account/account-details'])
    } else {
      this.errorMessageToggle = false;
      this.minLengthError = true;
      this.loader.hide();
    }
  }

  setAccount(account) {
    this.accountService.account = account;
    this.router.navigate(['account'])
  }

}
