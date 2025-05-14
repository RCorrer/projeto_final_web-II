import { CanActivateFn } from '@angular/router';

export const funcionarioGuard: CanActivateFn = (route, state) => {
  return true;
};
