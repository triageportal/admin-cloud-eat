/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TriModalComponent } from './tri-modal.component';

describe('TriModalComponent', () => {
  let component: TriModalComponent;
  let fixture: ComponentFixture<TriModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
