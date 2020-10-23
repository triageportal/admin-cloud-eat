import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';
import { TriModalService } from 'src/app/modals/tri-modal/tri-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as M from 'materialize-css';
import { ClinicService } from '../clinic.service';
import { TriModalInterface } from '../../modals/tri-modal/tri-modal.interface';
import { take } from 'rxjs/operators';
import { Clinic } from '../../interface/clinic.interface';
import { LoaderService } from '../../modals/loader/loader.service';

@Component({
  selector: 'app-create-edit-clinic',
  templateUrl: './create-edit-clinic.component.html',
  styleUrls: ['./create-edit-clinic.component.scss']
})
export class CreateEditClinicComponent implements OnInit {

  myForm: FormGroup;
  errorMessageToggle: boolean = false;
  errorMessage = '';
  label: string = '';

  @ViewChild("languageOption") languageOption: ElementRef;
  @ViewChild("languageLabel") languageLabel: ElementRef;
  @ViewChild("form") form: ElementRef;
  user: User;
  clinicId: any;


  constructor(private triModalService: TriModalService, private route: ActivatedRoute, private fb: FormBuilder, private loader: LoaderService,
    public authService: AuthService, public router: Router, private renderer: Renderer2, private clinicService: ClinicService) { 

    }

  ngOnInit() {
    this.clinicId = this.route.snapshot.params['id'];
    this.user = this.authService.getUser();
    console.log(this.user);
    
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), ]],
      addressLineOne: ['', [Validators.required, Validators.minLength(2), ]],
      addressLineTwo: ['', []],
      city: ['', [Validators.required, Validators.minLength(2), ]],
      zipCode: ['', [Validators.required, Validators.minLength(2), ]],
      stateOrRegion: ['', [Validators.required, Validators.minLength(2), ]],
      country: ['', [Validators.required, Validators.minLength(2), ]],
      phone: ['', [Validators.required, Validators.minLength(2), ]],
      clinicEmail: ['', [Validators.required, Validators.email, ]],
      website: ['', [Validators.required, Validators.minLength(2), ]],
      language: ['', [Validators.required, Validators.minLength(2), ]],
      contactPhone: ['', [Validators.required, Validators.minLength(2), ]],
      first_name: ['', [Validators.required, Validators.minLength(2), ]],
      last_name: ['', [Validators.required, Validators.minLength(2), ]],
      position: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
    });
console.log(this.myForm);

    if (this.clinicId && this.clinicService.clinicToEdit && (this.clinicId == this.clinicService.clinicToEdit.id)) {
      this.setFormValues(this.clinicService.clinicToEdit);
    }

  }


  setFormValues(clinic: Clinic) {
    let value = {}
    for (let key in this.myForm.controls) {
      if (this.myForm.controls.hasOwnProperty(key)) {
        if(clinic[key]) {
          value[key] = clinic[key];
        } else {
          value[key] = '';
        }
        
      }
    }

    this.myForm.setValue(value);
    this.first_name.setValidators([]);
    this.last_name.setValidators([]);
    this.position.setValidators([]);
    this.email.setValidators([]);
    this.label = 'active';
  }
  
  ngAfterViewInit(): void { 
    if(this.clinicId) {
      M.FormSelect.init(this.languageOption.nativeElement);
    } else {
      M.FormSelect.init(this.languageOption.nativeElement);
    }
    this.setOptionStyle();
  }

  onSubmit(){
    if(this.myForm.valid) {
      this.loader.show()
      this.clinicService.create(this.myForm.value, this.clinicId).subscribe(
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
            if(error.error.errors.clinicEmail) {
              this.errorMessage = 'Clinic email in use';
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
    if (this.clinicId) {
      this.modalSuccess.buttons = [{name: 'ok', class: ['indigo', 'lighten-1']}];
      this.modalSuccess.text = ['Clinic information was successfully updated'];
      this.clinicService.clinicToEdit = undefined;
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
    this.language.setValue(''); 
  }

  onCancel() {
    this.onReset();
    this.router.navigate(['/'])
  }

  setOptionStyle() {
    this.language.valueChanges.subscribe((value) =>{
      if (!value) {
        this.renderer.removeClass(this.languageLabel.nativeElement, 'active')
      } else {
        this.renderer.addClass(this.languageLabel.nativeElement, 'active')
      }      
    })
  }

  tryLater(){
    this.triModalService.triModalStateSource.next(this.modalTryLater);
  }


  modalSuccess: TriModalInterface = {
    type: 'success', 
    header: 'clinic Manager', 
    text: ['New clinic was successfully created',  'Click NEW CLINIC to create new clinic or click DONE'], 
    buttons: [{name: 'Add more clinic', class: ['indigo', 'lighten-1']}, {name: 'done', class: ['indigo', 'lighten-1']}],
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

  get stateOrRegion() {
    return this.myForm.get('stateOrRegion');
  }
  
  get country() {
    return this.myForm.get('country');
  }

  get phone() {
    return this.myForm.get('phone');
  }
  
  get clinicEmail() {
    return this.myForm.get('clinicEmail');
  }
  
  get website() {
    return this.myForm.get('website');
  }
  
  get first_name() {
    return this.myForm.get('first_name');
  }
  
  get contactPhone() {
    return this.myForm.get('contactPhone');
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
  
  get language() {
    return this.myForm.get('language');
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
