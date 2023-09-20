import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common'  ;
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login-comp/login/login.component';
import { SignupComponent } from './components/login-comp/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/login-comp/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home/home.component';
import { TablesComponent } from './components/home/tables/tables.component';
import { CreateTableComponent,DialogAnimationsExampleDialog } from './components/home/create-table/create-table.component';
import { AddDishesComponent } from './components/home/add-dishes/add-dishes.component';
import { FilterValuePipe } from './pipes/filter-value/filter-value.pipe';
import { PaymentComponentComponent } from './components/home/payment-component/payment-component.component';
import { TotalAmountComponent } from './components/home/total-amount/total-amount.component';
import { FilterDishPipe } from './pipes/filter-dish/filter-dish.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    TablesComponent,
    CreateTableComponent,
    AddDishesComponent,
    FilterValuePipe,
    DialogAnimationsExampleDialog,
    PaymentComponentComponent,
    TotalAmountComponent,
    FilterDishPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatAutocompleteModule 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports:[MatSidenavModule]
})
export class AppModule { }
