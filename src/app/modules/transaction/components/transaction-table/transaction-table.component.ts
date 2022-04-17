import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionType } from '../../enums/transaction-type';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TransactionTableComponent implements OnInit {
  /**
   * Budget table paginator
   */
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  /**
   * Budget table sort
   */
  @ViewChild(MatSort) public sort: MatSort;

  @Input() title: string;

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
    'name',
    'amount',
    'time',
    'totalAmount',
    'expand'
  ];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<Transaction>(true, []);
  }

  public ngAfterViewInit(): void {
    const transactions: any[] = [
      {
        "amount": 3541.60,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Delores Wallace",
        "category": "Amboy Street",
        "transactionType": 0,
        "location": "Boynton Place",
        "time": this.extractTime("2016-03-05T09:46:16")
      },
      {
        "amount": 3062.71,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Patrica Mcneil",
        "category": "Cypress Avenue",
        "transactionType": 1,
        "location": "Cyrus Avenue",
        "time": this.extractTime("2014-06-22T03:27:49")
      },
      {
        "amount": 2763.38,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Oneal Rollins",
        "category": "Linwood Street",
        "transactionType": 0,
        "location": "Imlay Street",
        "time": this.extractTime("2016-05-24T10:01:55")
      },
      {
        "amount": 1259.01,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Carey Charles",
        "category": "Grattan Street",
        "transactionType": 0,
        "location": "Conover Street",
        "time": this.extractTime("2018-03-10T05:37:59")
      },
      {
        "amount": 3982.73,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Jasmine Odonnell",
        "category": "Doone Court",
        "transactionType": 0,
        "location": "Coleman Street",
        "time": this.extractTime("2017-10-03T10:48:38")
      },
      {
        "amount": 3022.47,
        "userPhoto": "http://placehold.it/32x32",
        "name": "Miranda Duncan",
        "category": "Classon Avenue",
        "transactionType": 1,
        "location": "Plymouth Street",
        "time": this.extractTime("2018-09-12T12:37:34")
      }
    ];
    this.transactions = new MatTableDataSource(transactions);
    this.transactions.sort = this.sort;
    this.transactions.paginator = this.paginator;
    // @ts-ignore
    // const bankAccountId = parseInt(localStorage.getItem('selectedBankAccount'), 0);
    // this.accountService.getAccount(bankAccountId)
    //   .pipe(
    //     mergeMap((account) => {
    //       this.account = account;
    //       return this.transactionService.getTransactionsByAccount(bankAccountId);
    //     })
    //   )
    //   .subscribe((transactions) => {
    //
    //   });
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
   * Expands selected row
   *
   * @param row
   */
  public toggleRow(row: { expanded: boolean }): void {
    row.expanded = !row.expanded;
  }

  private extractTime(dateString: string): string {
    const d = new Date(dateString);
    let hour = this.addZero(d.getHours());
    let minutes = this.addZero(d.getMinutes());

    return hour + ":" + minutes;
  }

  private addZero(i: any): string {
    let result: string;

    if (i < 10) {
      result = '0' + i;
    } else {
      result = i;
    }

    return result;
  }
}
