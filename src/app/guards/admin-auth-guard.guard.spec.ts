import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminAuthGuardGuard } from './admin-auth-guard.guard';

describe('adminAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
