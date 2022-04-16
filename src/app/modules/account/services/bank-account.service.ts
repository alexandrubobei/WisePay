/**
 * Framework imports
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Custom imports
 */
import { BaseService } from '@mt/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankAccount } from '../models/bank-account';

/**
 * Bank account service
 */
@Injectable({
  providedIn: 'root'
})
export class BankAccountService extends BaseService {
  /**
   * Constructor
   *
   * @param http Http client instance
   */
  constructor(protected override http: HttpClient) {
    super(http);
  }

  /**
   * Creates an http client call and returns a collection of accounts
   */
  public getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${ this.baseUrl }/account/get-accounts`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call and returns a collection of accounts
   */
  public getAccount(id: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${ this.baseUrl }/account/get-account/${ id }`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call and returns a collection of accounts based on account type
   *
   * @param accountTypeId Budget type id for filtering
   */
  public getBudgetsByBudgetType(accountTypeId?: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${ this.baseUrl }/account/get-accounts/${ accountTypeId }`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call to create a new transaction in the database
   *
   * @param account New transaction object
   */
  public addAccount(account: BankAccount): Observable<number> {
    return this.http.post<number>(`${ this.baseUrl }/account/create-account`, { account }).pipe();
  }

  /**
   * Creates an http client call to create a new transaction in the database
   *
   * @param account New transaction object
   */
  public updateAccount(account: BankAccount): Observable<number> {
    return this.http.post<number>(`${ this.baseUrl }/account/update-account`, { account }).pipe();
  }
}
