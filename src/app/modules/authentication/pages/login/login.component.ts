import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mt/core';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Default return url
   * @private
   */
  private readonly returnUrl: string;

  /**
   * Attempt to submit form
   * @private
   */
  private formSubmitAttempt = false;

  /**
   * Authentication form instance
   */
  public form: FormGroup;

  /**
   * Login is invalid
   */
  public loginInvalid = false;

  /**
   * Check if user is already authenticated
   */
  public isAuthenticated: boolean;

  /**
   * Constructor
   *
   * @param fb Form builder
   * @param route Current active route
   * @param router Navigation router
   * @param authService Authentication service
   */
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.returnUrl = '/accounts';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Initialize component data
   */
  public async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();

    if (this.isAuthenticated) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  /**
   * Submits login credentials
   */
  public async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        const user = this.form.value as User;
        // await this.authService.login(user).subscribe(async (response) => {
        //     await this.router.navigate([this.returnUrl]);
        // });
        await this.router.navigate([this.returnUrl]);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
