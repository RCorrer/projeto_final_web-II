import { CanActivateFn } from '@angular/router';

export const clienteGuard: CanActivateFn = (route, state) => {
  return true;
};
