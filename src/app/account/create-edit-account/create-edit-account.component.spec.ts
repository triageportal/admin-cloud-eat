import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAccountComponent } from './create-edit-account.component';

describe('CreateEditAccountComponent', () => {
  let component: CreateEditAccountComponent;
  let fixture: ComponentFixture<CreateEditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
