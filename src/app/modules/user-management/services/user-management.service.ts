import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from '@mt/core';

/**
 * User management HTTP service
 */
@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends BaseService {
  /**
   * Constructor
   * @param http Current Http client instance
   */
  constructor(protected http: HttpClient) {
    /**
     * test
     */
    super(http);
  }
}
