import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Http base service
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  /**
   * Base url
   * @protected
   */
  protected readonly baseUrl: string = 'https://localhost:5001/api';

  /**
   * Constructor
   *
   * @param http Http client instance
   */
  constructor(protected http: HttpClient) {
  }
}
