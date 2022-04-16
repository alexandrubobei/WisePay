import { TransactionType } from './transaction-type';

/**
 * Transaction entity
 */
export interface Transaction {
  id: number;
  name: string;
  from: string;
  createdAt: Date;
  updatedAt: Date;
  transactionType: TransactionType;
  amount: number;
}
