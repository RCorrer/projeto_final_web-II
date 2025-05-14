import { CanActivateFn } from '@angular/router';

export const clienteGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
