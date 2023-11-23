import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesComponent } from './component/purchases/purchases.component';
import { PurchasesInsertComponent } from './component/purchases/purchases-insert/purchases-insert.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PaymentPlanComponent } from './component/purchases/payment-plan/payment-plan.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accounts/login',
  },
  {
    path: 'accounts/login',
    component: LoginComponent,
  },
  {
    path: 'accounts/register',
    component: RegisterComponent,
  },
  {
    path:'purchases', component:PurchasesComponent,
    children:[
      { path:'purchasesInsert', component:PurchasesInsertComponent},
      { path:'edicion/:id', component:PurchasesInsertComponent},
      { path:'view/:id', component:PaymentPlanComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
