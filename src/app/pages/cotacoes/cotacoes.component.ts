import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { CotacoesService } from 'src/app/services/cotacoes.service';

@Component({
  selector: 'app-cotacoes',
  templateUrl: './cotacoes.component.html',
  styleUrls: ['./cotacoes.component.scss']
})
export class CotacoesComponent implements OnInit {

  highcharts = Highcharts;
  rates = [];
  data = [];
  chartOptions;
  loadingRates = true;
  selectedCurrency = 'EUR';

  constructor(
    private cotacoesService: CotacoesService
  ) { }

  ngOnInit() {
    this.getWeekRates(0, new Date().toISOString().split('T')[0]);
  }

  changeSelectedCurrency(currency: string) {
    this.selectedCurrency = currency;
    this.setData();
  }

  // Função recursiva que executa de forma sequencial as requisições de busca 
  getWeekRates(aux: number, date: string) {
    this.cotacoesService.getDayRate(date).subscribe(
      response => {
        this.rates.push(response);
        console.log('aux: ', aux, this.rates);

        let nextDate = new Date(response.date + 'T00:00:00');
        nextDate.setDate(nextDate.getDate() - 1);
        
        if (aux + 1 < 7) this.getWeekRates(aux + 1, nextDate.toISOString().split('T')[0]);
        else {
          this.sortRatesByDate();
          this.setData();
        }
        
      }
    );
  }

  setData() {
    this.data = [{
      name: this.selectedCurrency,
      data: []
    }];

    this.chartOptions = {
      chart: {
        type: "spline"
      },
      title: {
        text: `USD x ${this.selectedCurrency}`
      },
      xAxis: {
        categories:[]
      },
      yAxis: {
        title: {
          text: this.selectedCurrency
        }
      },
      series: this.data
    }

    this.rates.forEach(e => {
      this.data[0].data.push(e.rates[this.selectedCurrency]);
      this.chartOptions.xAxis.categories.push(e.date);
    });
    
    console.log(this.data);
    this.loadingRates = false;
  }

  sortRatesByDate() {
    this.rates = this.rates.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    console.log(this.rates);
  }

}
