/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WarningModalService } from './warning-modal.service';

describe('Service: WarningModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarningModalService]
    });
  });

  it('should ...', inject([WarningModalService], (service: WarningModalService) => {
    expect(service).toBeTruthy();
  }));
});
