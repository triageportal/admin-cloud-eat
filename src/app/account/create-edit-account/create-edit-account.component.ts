import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';
import { TriModalService } from 'src/app/modals/tri-modal/tri-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as M from 'materialize-css';
import { AccountService } from '../account.service';
import { TriModalInterface } from '../../modals/tri-modal/tri-modal.interface';
import { take } from 'rxjs/operators';
import { LoaderService } from '../../modals/loader/loader.service';

@Component({
  selector: 'app-create-edit-account',
  templateUrl: './create-edit-account.component.html',
  styleUrls: ['./create-edit-account.component.scss']
})
export class CreateEditAccountComponent implements OnInit {

  myForm: FormGroup;
  errorMessageToggle: boolean = false;
  errorMessage = '';
  label: string = '';

  @ViewChild("form") form: ElementRef;
  user: User;
  accountId: any;


  constructor(private triModalService: TriModalService, private route: ActivatedRoute, private fb: FormBuilder, private loader: LoaderService,
    public authService: AuthService, public router: Router, private renderer: Renderer2, private accountService: AccountService) { 

    }

  ngOnInit() {
    this.accountId = this.route.snapshot.params['id'];
    this.user = this.authService.getUser();
    console.log(this.user);
    
    this.myForm = this.fb.group({ 
      phone: ['', [Validators.required, Validators.minLength(2), ]],
      first_name: ['', [Validators.required, Validators.minLength(2), ]],
      last_name: ['', [Validators.required, Validators.minLength(2), ]],
      position: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
    });
console.log(this.myForm);
    /* const account = {
      first_name: 'test',
      last_name: 'test',
      phone: 'test',
      email: 'test@test.com',
      position: 'test',
    }
    this.setFormValues(account) */
    if (this.accountId && this.accountService.accountToEdit && (this.accountId == this.accountService.accountToEdit.id)) {
      this.setFormValues(this.accountService.accountToEdit);
    }

  }


  setFormValues(account) {
    let value = {}
    for (let key in this.myForm.controls) {
      if (this.myForm.controls.hasOwnProperty(key)) {
        if(account[key]) {
          value[key] = account[key];
        } else {
          value[key] = '';
        }
        
      }
    }

    this.myForm.setValue(value);
    /* this.first_name.setValidators([]);
    this.last_name.setValidators([]);
    this.position.setValidators([]);
    this.email.setValidators([]); */
    this.label = 'active';
  }


  onSubmit(){
    if(this.myForm.valid) {
      this.loader.show()
      console.log(this.myForm.value);
      
      this.accountService.create(this.myForm.value, this.accountId).subscribe(
        result => {
          console.log(result);
          
          if (result == 'success') {
            this.afterSubmitSuccess();
          } else {
            this.tryLater();
          }
          this.loader.hide()
          this.errorMessageToggle = false;
        },
        error => {
          console.log(error);
          this.errorMessageToggle = false;
          this.loader.hide()
          if(error.status == 401) {
            this.authService.logout();
          } else if(error.error.errors) {
            if(error.error.errors.accountEmail) {
              this.errorMessage = 'account email in use';
            } else if(error.error.errors.email) {
              this.errorMessage = 'Contact email in use';
            }
            this.errorMessageToggle = true;          
          } else {
            this.tryLater();
          }
        }
      )
    }
    
  }

  afterSubmitSuccess(){
    if (this.accountId) {
      this.modalSuccess.buttons = [{name: 'ok', class: ['indigo', 'lighten-1']}];
      this.modalSuccess.text = ['account information was successfully updated'];
      this.accountService.accountToEdit = undefined;
      this.onCancel();
    } 
    this.triModalService.triModalStateSource.next(this.modalSuccess);
    this.triModalService.triModalRespondObservable.pipe(take(1)).subscribe(
      result => {
        if (result == 'done') {
          this.onCancel();
        } else {
          this.onReset();
        }              
      }
    )
  }

  onReset() {
    this.myForm.reset();
    M.updateTextFields();
    this.form.nativeElement.reset();
  }

  onCancel() {
    this.onReset();
    this.router.navigate(['/'])
  }



  tryLater(){
    this.triModalService.triModalStateSource.next(this.modalTryLater);
  }


  modalSuccess: TriModalInterface = {
    type: 'success', 
    header: 'account Manager', 
    text: ['New account was successfully created',  'Click NEW account to create new account or click DONE'], 
    buttons: [{name: 'Add more account', class: ['indigo', 'lighten-1']}, {name: 'done', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }
  
  modalTryLater: TriModalInterface = {
    type: 'warning', 
    header: 'Sorry', 
    text: ['Something went wrong. Please try later'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }




  get phone() {
    return this.myForm.get('phone');
  }
  
  get first_name() {
    return this.myForm.get('first_name');
  }

  
  get last_name() {
    return this.myForm.get('last_name');
  }

  get position() {
    return this.myForm.get('position');
  }

  get email() {
    return this.myForm.get('email');
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
