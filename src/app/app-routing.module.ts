import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuysComponent } from './component/buys/buys.component';
import { BuysInsertComponent } from './component/buys/buys-insert/buys-insert.component';
import { LoginUserComponent } from './component/login-user/login-user.component';
import { RegisterUserComponent } from './component/register-user/register-user.component';
import { PaidPlanComponent } from './component/buys/paid-plan/paid-plan.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accounts/login',
  },
  {
    path: 'accounts/login',
    component: LoginUserComponent,
  },
  {
    path: 'accounts/register',
    component: RegisterUserComponent,
  },
  {
    path:'buys', component:BuysComponent,
    children:[
      { path:'buysInsert', component:BuysInsertComponent},
      { path:'edicion/:id', component:BuysInsertComponent},
      { path:'view/:id', component:PaidPlanComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
