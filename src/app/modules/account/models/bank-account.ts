import { Transaction } from '../../transaction/models/transaction';

/**
 * Bank account entity
 */
export interface BankAccount {
  id: number;
  userId: number;
  name: string;
  amount: number;
  accountTypeId: number;
  createdAt: Date;
  modifiedAt: Date;
  transactions: Transaction[];
}
