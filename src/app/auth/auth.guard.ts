import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // Inject the router
  const router = inject(Router);

  // If no token, redirect to the sign-in page
  return !localStorage.getItem('token') ? router.createUrlTree(['/auth/signIn']) : true;
};
