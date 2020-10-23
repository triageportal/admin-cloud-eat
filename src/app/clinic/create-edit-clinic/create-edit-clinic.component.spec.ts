import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClinicComponent } from './create-edit-clinic.component';

describe('CreateEditClinicComponent', () => {
  let component: CreateEditClinicComponent;
  let fixture: ComponentFixture<CreateEditClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
