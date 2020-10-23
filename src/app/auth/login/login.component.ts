import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as M from 'materialize-css';
import { LogoutModalService } from '../../modals/logout-modal/logout-modal.service';
import { User } from '../../interface/user.interface';
import { LoaderService } from '../../modals/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  noResults: boolean = false;
  preferredLanguageLabel = "ENG";
  errorMessage = '';

  constructor(private loader: LoaderService, private logoutService: LogoutModalService, private route: ActivatedRoute, private fb: FormBuilder, public authService: AuthService, public router: Router) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.navigateUser();
    };
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, ]],
      password: ['', [Validators.required, ]],
    });

  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }


  onSubmit() {
    if (this.myForm.valid) {
      this.loader.show();
      console.log(this.myForm)
      this.authService.login(this.email.value, this.password.value)
        .subscribe(
          result => {
            console.log(result);
            this.loader.hide();
            this.authService.setSession(result.access_token, result.user);
            this.navigateUser();
          },
          error => {
            console.log(error);
            if (error.status == 401) {
              this.noResults = true;
              if (error.error == 'suspended') {
                this.errorMessage = '';
              } else if (error.error == 'inactive') {
                this.errorMessage = 'Your account is inactive';
              } else {
                this.errorMessage = 'Wrong email or password';
              }
            }
            this.loader.hide();
          }
        )
    }
  }

  navigateUser() {
    const user = this.authService.getUser();
    this.logoutService.setLogoutTimer();
    if (user.access_type == 'marketing') {
      //this.router.navigate(['admin'])
    } else if (user.access_type == 'admin'){
      this.router.navigate(['admin'])
    }
  }




  onReset() {
    this.myForm.reset();
    M.updateTextFields();
  }


  onFocus(count: number){
    let loopCheck = 0;
    Object.keys(this.myForm.controls).forEach((index: string) => {
      const control: AbstractControl = this.myForm.controls[index];
      
      if(control.untouched && loopCheck < count) {
        control.markAsTouched();
      }
      loopCheck++; 
    });
  }
}