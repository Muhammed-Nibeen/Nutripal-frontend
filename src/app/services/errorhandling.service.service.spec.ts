import { TestBed } from '@angular/core/testing';

import { ErrorhandlingServiceService } from './errorhandling.service.service';

describe('ErrorhandlingServiceService', () => {
  let service: ErrorhandlingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorhandlingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
