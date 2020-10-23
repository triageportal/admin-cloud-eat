/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetLocalLanguageService } from './get-local-language.service';

describe('Service: GetLocalLanguage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLocalLanguageService]
    });
  });

  it('should ...', inject([GetLocalLanguageService], (service: GetLocalLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
