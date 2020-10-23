/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserDetectorService } from './browser-detector.service';

describe('Service: BrowserDetector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserDetectorService]
    });
  });

  it('should ...', inject([BrowserDetectorService], (service: BrowserDetectorService) => {
    expect(service).toBeTruthy();
  }));
});
