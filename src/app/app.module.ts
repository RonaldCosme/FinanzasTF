import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatOptionModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RegistrarComponent } from "./component/registrar/registrar.component";
import { ComprasComponent } from "./component/compras/compras.component";
import { IsertarComprasComponent } from "./component/compras/isertar-compras/isertar-compras.component";
import { ListarComprasComponent } from "./component/compras/listar-compras/listar-compras.component";
import { PagadoComponent } from "./component/compras/pagado/pagado.component";

@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    IsertarComprasComponent,
    ListarComprasComponent,
    PagadoComponent,
    ComprasComponent


    ],
    imports: [
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
    providers: [],
    bootstrap: [AppComponent]

})

export class AppRoutingModule { }
export class YourModule { }