import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common'  ;
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';


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
