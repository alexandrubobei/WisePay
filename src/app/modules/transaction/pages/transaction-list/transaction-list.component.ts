import { Component } from '@angular/core';
import { BankAccount } from '../../../account/models/bank-account';
import { TransactionType } from '../../enums/transaction-type';

/**
 * Budget list component
 */
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  /**
   * Transaction type
   */
  public transactionType = TransactionType;

  /**
   * Selected account
   */
  public account: BankAccount;

  /**
   * Constructor
   */
  constructor() {
  }
}
