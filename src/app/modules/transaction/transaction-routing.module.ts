import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { TransactionLayoutComponent } from './components/transaction-layout/transaction-layout.component';

import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './pages/transaction-details/transaction-edit.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';

/**
 * Budget module routes
 */
const routes: Routes = [{
  path: '',
  component: TransactionLayoutComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: TransactionListComponent },
    { path: 'add', component: TransactionAddComponent },
    { path: 'details', component: TransactionEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MatSnackBar]
})
export class TransactionRoutingModule {
}
