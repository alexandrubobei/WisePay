/**
 * Framework imports
 */
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * Custom imports
 */
import { AuthService } from '@mt/core';
import { Subscription } from 'rxjs';
import { User } from './modules/authentication/pages/models/user';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Sidenav component child instance
   */
  @ViewChild(MatSidenav) public sidenav!: MatSidenav;

  /**
   * Subscriptions
   *
   * @private
   */
  private subscriptions: Subscription = new Subscription();

  /**
   * Check for user authentication
   */
  public isAuthenticated = false;

  /**
   * Constructor
   * @param observer BreakpointObserver
   * @param authService AuthenticationService instance
   */
  constructor(private observer: BreakpointObserver, public authService: AuthService) {
    this.subscriptions.add(
      this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated)
    );
  }

  /**
   * Initialize component data
   */
  public async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();
    this.setCurrentUser();
  }

  /**
   * Sets the current user
   */
  setCurrentUser() {
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }

  /**
   * Hook for when the view has renderer.
   */
  public ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe(async (res) => {
      if (this.isAuthenticated) {
        if (res.matches) {
          this.sidenav.mode = 'over';
          await this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          await this.sidenav.open();
        }
      }
    });
  }

  /**
   * Hides the side menu
   */
  public async hideSideMenu(): Promise<void> {
    if (this.sidenav.opened) {
      await this.sidenav.close();
    } else {
      await this.sidenav.open();
    }
  }

  /**
   * Hook to destroy subscriptions or memory leak attributes
   */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
