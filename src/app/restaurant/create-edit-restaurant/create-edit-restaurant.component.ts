import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';
import { TriModalService } from 'src/app/modals/tri-modal/tri-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as M from 'materialize-css';
import { TriModalInterface } from '../../modals/tri-modal/tri-modal.interface';
import { take } from 'rxjs/operators';
import { LoaderService } from '../../modals/loader/loader.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-create-edit-restaurant',
  templateUrl: './create-edit-restaurant.component.html',
  styleUrls: ['./create-edit-restaurant.component.scss']
})
export class CreateEditRestaurantComponent implements OnInit {

  myForm: FormGroup;
  errorMessageToggle: boolean = false;
  errorMessage = '';
  label: string = '';

  @ViewChild("languageOption") languageOption: ElementRef;
  @ViewChild("languageLabel") languageLabel: ElementRef;
  @ViewChild("form") form: ElementRef;
  restaurantId: any;
  week = [];
  accountId: any;


  constructor(private triModalService: TriModalService, private route: ActivatedRoute, private fb: FormBuilder, private loader: LoaderService,
    public authService: AuthService, public router: Router, private renderer: Renderer2, private restaurantService: RestaurantService) { 

    }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const action = this.route.snapshot.params['action'];

    
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), ]],
      addressLineOne: ['', [Validators.required, Validators.minLength(2), ]],
      addressLineTwo: ['', []],
      city: ['', [Validators.required, Validators.minLength(2), ]],
      zipCode: ['', [Validators.required, Validators.minLength(2), ]],
      state: ['', [Validators.required, Validators.minLength(2), ]],
      phone: ['', [Validators.required, Validators.minLength(2), ]],
      website: ['', [Validators.required, Validators.minLength(2), ]],
      email: ['', [Validators.required, Validators.email]],
    });
console.log(this.myForm);

    if (action == 'edit' && this.restaurantId) {
      this.setFormValues(this.restaurantService.restaurantToEdit);
      this.week = this.restaurantService.restaurantToEdit.hours;
    } else {
      this.accountId = id;
      this.setWeek();
    }

  }


  setFormValues(restaurant) {
    let value = {}
    for (let key in this.myForm.controls) {
      if (this.myForm.controls.hasOwnProperty(key)) {
        if(restaurant[key]) {
          value[key] = restaurant[key];
        } else {
          value[key] = '';
        }
        
      }
    }

    this.myForm.setValue(value);
    this.label = 'active';
  }
  

  onSubmit(){
    console.log(this.week);
    
    if(this.myForm.valid) {
      this.loader.show()
      this.restaurantService.create(this.myForm.value, this.restaurantId, this.accountId).subscribe(
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
            if(error.error.errors.restaurantEmail) {
              this.errorMessage = 'restaurant email in use';
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
    if (this.restaurantId) {
      this.modalSuccess.buttons = [{name: 'ok', class: ['indigo', 'lighten-1']}];
      this.modalSuccess.text = ['restaurant information was successfully updated'];
      this.restaurantService.restaurantToEdit = undefined;
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

  setWeek() {
    const weekDays = ['Monday', 'Tuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    weekDays.forEach(item => {
      this.week.push({day: item, startHour: '00', startIndex: 'am', endHour: '00', endIndex: 'am'})
    })
  }


  tryLater(){
    this.triModalService.triModalStateSource.next(this.modalTryLater);
  }


  modalSuccess: TriModalInterface = {
    type: 'success', 
    header: 'restaurant Manager', 
    text: ['New restaurant was successfully created',  'Click NEW restaurant to create new restaurant or click DONE'], 
    buttons: [{name: 'Add more restaurant', class: ['indigo', 'lighten-1']}, {name: 'done', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }
  
  modalTryLater: TriModalInterface = {
    type: 'warning', 
    header: 'Sorry', 
    text: ['Something went wrong. Please try later'], 
    buttons: [{name: 'ok', class: ['indigo', 'lighten-1']}],
    state: 'open'
  }


  get name() {
    return this.myForm.get('name');
  }

  get addressLineOne() {
    return this.myForm.get('addressLineOne');
  }

  get addressLineTwo() {
    return this.myForm.get('addressLineTwo');
  }

  get city() {
    return this.myForm.get('city');
  }

  get zipCode() {
    return this.myForm.get('zipCode');
  }

  get state() {
    return this.myForm.get('state');
  }


  get phone() {
    return this.myForm.get('phone');
  }

  
  get website() {
    return this.myForm.get('website');
  }

  get email() {
    return this.myForm.get('email');
  }

  get monday() {
    return this.myForm.get('monday');
  }

  get tuesday() {
    return this.myForm.get('tuesday');
  }

  get wednesday() {
    return this.myForm.get('wednesday');
  }

  get friday() {
    return this.myForm.get('friday');
  }

  get saturday() {
    return this.myForm.get('saturday');
  }

  get sunday() {
    return this.myForm.get('sunday');
  }

  get thursday() {
    return this.myForm.get('thursday');
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
