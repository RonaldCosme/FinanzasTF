import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrarComponent } from './component/registrar/registrar.component';
import { ComprasComponent } from './component/compras/compras.component';
import { IsertarComprasComponent } from './component/compras/isertar-compras/isertar-compras.component';
import { PagadoComponent } from './component/compras/pagado/pagado.component';


const routes: Routes = [ 
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cuenta/login',
  },
  {
    path: 'cuenta/login',
    component: LoginComponent,
  },
  {
    path: 'cuenta/registrar',
    component: RegistrarComponent,
  },
  {
    path:'compras', component:ComprasComponent,
    children:[
      { path:'comprasInsertar', component:IsertarComprasComponent},
      { path:'edicion/:id', component:IsertarComprasComponent},
      { path:'view/:id', component:PagadoComponent}
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }