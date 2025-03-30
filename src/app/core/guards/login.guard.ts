import { Router, type CanActivateFn } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const accountService = inject(AccountsService);
  const router = inject(Router);

  if (accountService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
