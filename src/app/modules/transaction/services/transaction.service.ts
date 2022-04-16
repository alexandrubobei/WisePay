import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from '@mt/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/transaction-type';

/**
 * Budget service
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {
  /**
   * Constructor
   * @param http Http client instance
   */
  constructor(protected override http: HttpClient) {
    super(http);
  }

  /**
   * Creates an http client call and returns a collection of budgets
   */
  public getBudgets(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${ this.baseUrl }/budget/get-budgets`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call and returns a collection of budgets
   */
  public getTransactionsByAccountAndTransactionType(accountId: number, transactionType: TransactionType): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${ this.baseUrl }/budget/get-budgets/${accountId}`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call and returns a collection of budgets
   */
  public getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${ this.baseUrl }/budget/get-budgets/${accountId}`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call and returns a collection of budgets
   *
   * @param budgetTypeId Budget type id for filtering
   */
  public getBudgetsByBudgetType(budgetTypeId?: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${ this.baseUrl }/budget/get-budgets/${ budgetTypeId }`).pipe(
      map((budgets) => budgets)
    );
  }

  /**
   * Creates an http client call to create a new transaction in the database
   *
   * @param budget New transaction object
   */
  public addNewBudget(budget: Transaction): Observable<number> {
    return this.http.post<number>(`http://localhost:5001/add-budget`, budget).pipe();
  }
}
