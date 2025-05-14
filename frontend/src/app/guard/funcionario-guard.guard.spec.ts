import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { funcionarioGuardGuard } from './funcionario-guard.guard';

describe('funcionarioGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => funcionarioGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
