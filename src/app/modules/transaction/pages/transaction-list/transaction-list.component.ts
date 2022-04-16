import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { BankAccount } from '../../../account/models/bank-account';
import { BankAccountService } from '../../../account/services/bank-account.service';

import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/transaction-type';
import { TransactionService } from '../../services/transaction.service';

/**
 * Budget list component
 */
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, AfterViewInit {
  /**
   * Budget table paginator
   */
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  /**
   * Budget table sort
   */
  @ViewChild(MatSort) public sort: MatSort;

  /**
   * Budget data source
   */
  public transactions: MatTableDataSource<Transaction>;

  /**
   * Budget table selection
   */
  public selection: SelectionModel<Transaction>;

  /**
   * Table columns
   */
  public displayedColumns = [
    'select',
    'name',
    'from',
    'createdAt',
    'updatedAt',
    'actions'
  ];

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
   * @param transactionService BudgetService instance
   * @param accountService AccountService instance
   * @param router Navigation router instance
   */
  constructor(private transactionService: TransactionService, private accountService: BankAccountService, private router: Router) {
  }

  /**
   * Initialize component data
   */
  public ngOnInit(): void {
    this.selection = new SelectionModel<Transaction>(true, []);
  }

  /**
   * Hook for when the page has rendered
   */
  public async ngAfterViewInit() {
    // @ts-ignore
    const bankAccountId = parseInt(localStorage.getItem('selectedBankAccount'), 0);
    this.accountService.getAccount(bankAccountId)
      .pipe(
        mergeMap((account) => {
          this.account = account;
          return this.transactionService.getTransactionsByAccount(bankAccountId);
        })
      )
      .subscribe((transactions) => {
        this.transactions = new MatTableDataSource(transactions);
        this.transactions.sort = this.sort;
        this.transactions.paginator = this.paginator;
      });
  }

  /**
   * Transaction type changed
   *
   * @param matSelectChange Selected transaction type. Reloads the table
   */
  public transactionTypeChanged(matSelectChange: MatSelectChange): void {
    // @ts-ignore
    const bankAccountId = parseInt(localStorage.getItem('selectedBankAccount'), 0);
    const transactionType = matSelectChange.value as TransactionType;

    if (transactionType !== TransactionType.Income && transactionType !== TransactionType.Expense) {
      this.transactionService.getTransactionsByAccount(bankAccountId).subscribe((companies) => {
        this.transactions = new MatTableDataSource(companies);
        this.transactions.sort = this.sort;
        this.transactions.paginator = this.paginator;
      });
    } else {
      this.transactionService.getTransactionsByAccountAndTransactionType(bankAccountId, transactionType).subscribe((companies) => {
        this.transactions = new MatTableDataSource(companies);
        this.transactions.sort = this.sort;
        this.transactions.paginator = this.paginator;
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.transactions.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.transactions.data.forEach(row => this.selection.select(row));
  }

  /**
   * Navigate to add transaction page
   */
  public async navigateToCompanyAdd(): Promise<void> {
    await this.router.navigate(['add']);
  }
}
