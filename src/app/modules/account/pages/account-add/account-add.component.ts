/**
 * Framework imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgxIzitoastService } from 'ngx-izitoast';

/**
 * Custom imports
 */
import { BankAccount } from '../../models/bank-account';
import { BankAccountService } from '../../services/bank-account.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  /**
   * Account instance
   * @private
   */
  private account: BankAccount;

  /**
   * Budget form
   */
  public form: FormGroup;

  /**
   * Constructor
   *
   * @param formBuilder Form builder instance
   * @param accountService Account service instance
   * @param router Navigation router instance
   * @param toastService Notification service instance
   */
  constructor(
    private formBuilder: FormBuilder,
    private accountService: BankAccountService,
    private router: Router,) {
  }

  /**
   * Initialize component data
   */
  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      accountTypeId: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Save new account
   */
  public async save(): Promise<void> {
    this.account = this.form.value as BankAccount;
    this.account.userId = 1;
    this.account.createdAt = new Date();
    this.account.modifiedAt = new Date();
    this.accountService.addAccount(this.account).subscribe();

    // this.toastService.success({
    //   title: 'OK',
    //   message: 'Successfully inserted record!'
    // });

    await this.router.navigate(['/accounts/list']);
  }
}
