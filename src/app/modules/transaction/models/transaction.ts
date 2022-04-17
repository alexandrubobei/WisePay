import { Time } from '@angular/common';
import { TransactionType } from '../enums/transaction-type';
import { TransactionCategory } from './transaction-category';

/**
 * Transaction entity
 */
export interface Transaction {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  time: Time;
  transactionType: TransactionType;
  category: TransactionCategory;
  amount: number;
  location: string;
  userPhoto: string;
}
