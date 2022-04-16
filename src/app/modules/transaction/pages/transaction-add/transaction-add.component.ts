/**
 * Framework imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgxIzitoastService } from 'ngx-izitoast';
import { mergeMap } from 'rxjs/operators';

/**
 * Custom imports
 */
import { BankAccount } from '../../../account/models/bank-account';
import { BankAccountService } from '../../../account/services/bank-account.service';
import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/transaction-type';
import { TransactionService } from '../../services/transaction.service';

/**
 * Add new transaction component
 */
@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit {
  /**
   * Budget instance
   * @private
   */
  private transaction: Transaction;

  /**
   * Budget form
   */
  public form: FormGroup;

  /**
   * Transaction type
   */
  public transactionTypes: TransactionType;

  /**
   * Constructor
   *
   * @param formBuilder Form builder instance
   * @param transactionService Budget service instance
   * @param accountService Account service instance
   * @param router Navigation router instance
   * @param toastService Notification service instance
   */
  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private accountService: BankAccountService,
    private router: Router,) {
  }

  /**
   * Initialize component data
   */
  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      registrationCode: new FormControl('', [Validators.required]),
      registrationNumber: new FormControl('', [Validators.required]),
      partner: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required])
    });
  }

  /**
   * Save new transaction
   */
  public async save(): Promise<void> {
    this.transaction = this.form.value as Transaction;

    // this.transactionService
    //   .addNewBudget(this.transaction)
    //   .pipe(
    //     mergeMap((transactionId) => {
    //       if (transactionId > 0) {
    //         // @ts-ignore
    //         const currentAccountId = parseInt(localStorage.getItem('selectedAccountId'), 0);
    //         return this.accountService.getAccount(currentAccountId);
    //       }
    //
    //       return null;
    //     }),
    //     mergeMap((account: BankAccount) => {
    //       if (this.transaction.transactionType === TransactionType.Income) {
    //         account.amount += this.transaction.amount;
    //       } else {
    //         account.amount -= this.transaction.amount;
    //       }
    //
    //       return this.accountService.updateAccount(account);
    //     })
    //   )
    //   .subscribe(async (response) => {
    //     // this.toastService.success({
    //     //   title: 'OK',
    //     //   message: 'Successfully inserted record!'
    //     // });
    //
    //     await this.router.navigate(['/companies/list']);
    //   }, error => {}
    //   //   this.toastService.error({
    //   //   title: 'OK',
    //   //   message: `Error: ${ error.message }`
    //   // })
    //   );
  }
}
