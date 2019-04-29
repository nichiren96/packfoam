import { TestBed, inject } from '@angular/core/testing';

import { ExitsService } from './exits.service';

describe('ExitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExitsService]
    });
  });

  it('should be created', inject([ExitsService], (service: ExitsService) => {
    expect(service).toBeTruthy();
  }));
});
