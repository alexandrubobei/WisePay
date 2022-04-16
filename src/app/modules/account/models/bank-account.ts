import { Transaction } from '../../transaction/models/transaction';

/**
 * Account entity
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
