import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NewAuthGuard } from './new-auth.guard';

describe('NewAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => NewAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
