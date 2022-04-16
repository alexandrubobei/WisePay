import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementLayoutComponent } from './components/user-management-layout/user-management-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [{
  path: '',
  component: UserManagementLayoutComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MatSnackBar]
})
export class UserManagementRoutingModule {
}
