/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';

/**
 * Application imports
 */
import { AuthenticationLayoutComponent } from './pages/authenticaton-layout/authentication-layout.component';
import { LoginComponent } from './pages/login/login.component';

/**
 * Authentication module routes
 */
const routes: Routes = [{
  path: '',
  component: AuthenticationLayoutComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MatSnackBar]
})
export class AuthenticationRoutingModule {
}
