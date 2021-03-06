import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CotacoesComponent } from './pages/cotacoes/cotacoes.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsComponent } from './components/charts/charts.component';
import { CotacoesApiComponent } from './pages/cotacoes-api/cotacoes-api.component';


@NgModule({
  declarations: [
    AppComponent,
    CotacoesComponent,
    ChartsComponent,
    CotacoesApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
