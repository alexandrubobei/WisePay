/**
 * Framework imports
 */
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';

/**
 * Custom imports
 */
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountAddComponent } from './pages/account-add/account-add.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountListComponent } from './pages/account-list/account-list.component';

/**
 * Budget module routes
 */
const routes: Routes = [{
  path: '',
  component: AccountLayoutComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: AccountListComponent },
    { path: 'add', component: AccountAddComponent },
    { path: 'details', component: AccountDetailsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MatSnackBar]
})
export class AccountRoutingModule {
}
