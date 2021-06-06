import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CotacoesComponent } from './pages/cotacoes/cotacoes.component';

import { HighchartsChartComponent } from 'highcharts-angular';
import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    HighchartsChartComponent,
    CotacoesComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
