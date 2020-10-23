/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogoutModalService } from '../modals/logout-modal/logout-modal.service';

describe('Service: LogoutModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutModalService]
    });
  });

  it('should ...', inject([LogoutModalService], (service: LogoutModalService) => {
    expect(service).toBeTruthy();
  }));
});
