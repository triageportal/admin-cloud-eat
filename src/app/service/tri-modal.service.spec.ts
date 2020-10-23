/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TriModalService } from '../modals/tri-modal/tri-modal.service';

describe('Service: TriModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriModalService]
    });
  });

  it('should ...', inject([TriModalService], (service: TriModalService) => {
    expect(service).toBeTruthy();
  }));
});
