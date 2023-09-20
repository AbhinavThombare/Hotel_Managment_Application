import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishesComponent } from './components/home/add-dishes/add-dishes.component';
import { CreateTableComponent } from './components/home/create-table/create-table.component';
import { HomeComponent } from './components/home/home/home.component';
import { TablesComponent } from './components/home/tables/tables.component';
import { TotalAmountComponent } from './components/home/total-amount/total-amount.component';
import { ForgotPasswordComponent } from './components/login-comp/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login-comp/login/login.component';
import { SignupComponent } from './components/login-comp/signup/signup.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  {
    path: 'home', component: HomeComponent, canActivate:[AuthguardGuard],
    children:[
      {
        path:'',component:TablesComponent, canActivate:[AuthguardGuard]
      },
      {
        path:'tabledata',component:CreateTableComponent, canActivate:[AuthguardGuard]
      },
      {
        path:'adddishes',component:AddDishesComponent,canActivate:[AuthguardGuard]
      },
      {
        path:'totalAmount',component:TotalAmountComponent,canActivate:[AuthguardGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
