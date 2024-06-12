import { TestBed } from '@angular/core/testing';

import { NutritionistService } from './nutritionist.service';

describe('NutritionistService', () => {
  let service: NutritionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
