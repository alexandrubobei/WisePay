import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../modules/authentication/pages/models/user';
import { BaseService } from '../services/base-service.service';

/**
 * Authentication service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  /**
   * Is user authenticated check
   */
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  /**
   * Constructor
   *
   * @param http HttpClient instance
   */
  constructor(protected override http: HttpClient) {
    super(http);
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null;
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  /**
   * Performs the login http call
   *
   * @param user User
   */
  public login(user: User) {
    return this.http.post<any>(`${ this.baseUrl }/authentication/login`, { user }).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.apiResponseObject));
          this.isAuthenticated.next(true);
          this.currentUserSource.next(response.apiResponseObject);
        }
      })
    );
  }

  /**
   * Sets the current user
   *
   * @param user
   */
  public setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  /**
   * Performs the logout http call
   *
   * @param redirect Redirect URL
   */
  public async logout(redirect: string): Promise<void> {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSource.next(null);
  }
}
