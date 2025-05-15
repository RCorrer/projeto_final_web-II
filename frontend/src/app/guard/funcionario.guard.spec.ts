import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { funcionarioGuard } from './funcionario.guard';

describe('funcionarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => funcionarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
