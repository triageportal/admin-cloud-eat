import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRestaurantComponent } from './create-edit-restaurant.component';

describe('CreateEditRestaurantComponent', () => {
  let component: CreateEditRestaurantComponent;
  let fixture: ComponentFixture<CreateEditRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
