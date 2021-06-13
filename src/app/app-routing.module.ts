import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotacoesApiComponent } from './pages/cotacoes-api/cotacoes-api.component';
import { CotacoesComponent } from './pages/cotacoes/cotacoes.component';


const routes: Routes = [
  {
    path: '', component: CotacoesComponent
  },
  {
    path: 'com_api', component: CotacoesApiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
