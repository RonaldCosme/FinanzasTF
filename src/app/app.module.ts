import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table'
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import{MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule}from  '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BuysComponent } from './component/buys/buys.component';
import { BuysListComponent } from './component/buys/buys-list/buys-list.component';
import { BuysInsertComponent } from './component/buys/buys-insert/buys-insert.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterUserComponent } from './component/register-user/register-user.component';
import { LoginUserComponent } from './component/login-user/login-user.component';
import { PaidPlanComponent } from './component/buys/paid-plan/paid-plan.component';
import { DarkModeService } from './dark-mode.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    AppComponent,
    BuysComponent,
    BuysListComponent,
    BuysInsertComponent,
    RegisterUserComponent,
    LoginUserComponent,
    PaidPlanComponent,
  ],
  imports: [
    NgxMatSelectSearchModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatOptionModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  providers: [DarkModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class YourModule { }
