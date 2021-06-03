import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotacoesComponent } from './pages/cotacoes/cotacoes.component';


const routes: Routes = [
  {
    path: '', component: CotacoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
