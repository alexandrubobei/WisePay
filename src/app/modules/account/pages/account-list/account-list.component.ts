/**
 * Framework imports
 */
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

/**
 * Custom imports
 */
import { BankAccount } from '../../models/bank-account';
import { BankAccountService } from '../../services/bank-account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, AfterViewInit {
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
  public accounts: MatTableDataSource<BankAccount>;

  /**
   * Budget table selection
   */
  public selection: SelectionModel<BankAccount>;

  /**
   * Table columns
   */
  public displayedColumns = [
    'select',
    'name',
    'amount',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  /**
   * Constructor
   * @param accountService AccountService instance
   * @param router Navigation router instance
   */
  constructor(private accountService: BankAccountService, private router: Router) {
  }

  /**
   * Initialize component and component data
   */
  public ngOnInit(): void {
    this.selection = new SelectionModel<BankAccount>(true, []);
  }

  /**
   * Hook for when the page has rendered
   */
  public async ngAfterViewInit() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = new MatTableDataSource(accounts);
      this.accounts.sort = this.sort;
      this.accounts.paginator = this.paginator;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.accounts.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.accounts.data.forEach(row => this.selection.select(row));
  }

  /**
   * Navigate to add transaction page
   */
  public async navigateToCompanyAdd(): Promise<void> {
    await this.router.navigate(['add']);
  }
}
