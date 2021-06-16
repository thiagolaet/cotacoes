import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Rate } from 'src/app/models/Rate';

import { CotacoesService } from 'src/app/services/cotacoes.service';

@Component({
  selector: 'app-cotacoes',
  templateUrl: './cotacoes.component.html',
  styleUrls: ['./cotacoes.component.scss']
})
export class CotacoesComponent implements OnInit {

  ratesRaw = [];
  loadingRates = true;
  data;

  constructor(
    private cotacoesService: CotacoesService
  ) { }

  ngOnInit() {
    this.getWeekRates();
  }

  getWeekDates(): string[] {
    // Checando se já passou das 16 horas UTC (hora que ocorre a inserção dos dados referentes ao dia atual)
    let nDays = 7;
    if (new Date().getUTCHours() >= 16) nDays = 6

    let timezoneOffset = (new Date().getTimezoneOffset() * 60000);
    let weekDates = [new Date(Date.now() - timezoneOffset).toISOString().split('T')[0]];
    for (let i = 0; i < nDays; i++) {
      let dayBefore = new Date(weekDates[i] + 'T00:00:00');
      dayBefore.setDate(dayBefore.getDate() - 1);
      weekDates.push(dayBefore.toISOString().split('T')[0])
    }
    return weekDates;
  }

  // Realizando as requisições de maneira simultânea (melhor desempenho)
  getWeekRates() {
    let weekDatesObservables = [];
    this.getWeekDates().forEach(date => {
      weekDatesObservables.push(this.cotacoesService.getDayRate(date));
    });
    forkJoin(weekDatesObservables).subscribe(resolve => {
      this.ratesRaw = resolve;
      
      // Ordenando a lista resultante pela data
      this.sortRatesByDate();

      // A API retorna a última data válida antes da data enviada na requisição, o que acaba gerando duplicatas na lista resultante
      this.filterDuplicates();
      
      this.data = this.formatRates();

      this.loadingRates = false;
    },
    error => {
      console.log(error);
      this.loadingRates = false;
    });
    
  }

  // Primeira implementação - função recursiva que executa de forma sequencial as requisições de busca
  // buscava os 7 últimos dias com informações disponíveis e não a última semana

  // getWeekRates(aux: number, date: string) {
  //   this.cotacoesService.getDayRate(date).subscribe(
  //     response => {
  //       this.ratesRaw.push(response);
  //       console.log('aux: ', aux, this.ratesRaw);

  //       let nextDate = new Date(response.date + 'T00:00:00');
  //       nextDate.setDate(nextDate.getDate() - 1);
        
  //       if (aux + 1 < 7) this.getWeekRates(aux + 1, nextDate.toISOString().split('T')[0]);
  //       else {
  //         this.sortRatesByDate();
  //         this.loadingRates = false;
  //       }
  //     }
  //   );
  // }

  sortRatesByDate() {
    this.ratesRaw = this.ratesRaw.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  filterDuplicates() {
    let newArray = [this.ratesRaw[0]];
    for (let i = 1; i < 7; i++) {
      if (this.ratesRaw[i].date != this.ratesRaw[i-1].date) newArray.push(this.ratesRaw[i]); 
    }
    this.ratesRaw = newArray;
  }

  formatRates() {
    let data = {
      rates: this.createRatesDict(),
      dates: []
    }

    this.ratesRaw.forEach(dayRate => {

      data.dates.push(new Date(dayRate.date + 'T00:00:00').toLocaleDateString('pt-br',
      {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric'
      }));

      Object.keys(data.rates).forEach(currency => {
        data.rates[currency].push(dayRate.rates[currency]);
      });
    });

    console.log(data);
    return data;
  }

  createRatesDict() {
    let rates = {};
    Object.keys(this.ratesRaw[0].rates).forEach(currency => {
      rates[currency] = [];
    });
    return rates;
  }

}
