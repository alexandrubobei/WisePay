import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

/**
 * Authentication guard service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  /**
   * Constructor
   *
   * @param authService Authentication service instance
   * @param router Navigation router
   */
  constructor(public authService: AuthService, public router: Router) {
  }

  /**
   * Guard hook. This is used on routes to check if the user is logged in and provide access
   */
  async canActivate(): Promise<boolean> {
    if (!await this.authService.checkAuthenticated()) {
      await this.router.navigate(['login']);

      return false;
    }

    return true;
  }
}
