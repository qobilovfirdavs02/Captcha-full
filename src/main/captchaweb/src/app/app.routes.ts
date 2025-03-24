import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralManagementComponent } from './components/general-management/general-management.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserAuthComponent } from './products/user-auth/user-auth.component';
import { UserDashboardComponent } from './products/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'general-management', component: GeneralManagementComponent },
  { path: 'auth', component: UserAuthComponent},
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '**', redirectTo: '' }, 
];