/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TryLaterModalService } from './try-later-modal.service';

describe('Service: TryLaterModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TryLaterModalService]
    });
  });

  it('should ...', inject([TryLaterModalService], (service: TryLaterModalService) => {
    expect(service).toBeTruthy();
  }));
});
