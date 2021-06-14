import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { CotacoesService } from 'src/app/services/cotacoes.service';

@Component({
  selector: 'app-cotacoes',
  templateUrl: './cotacoes.component.html',
  styleUrls: ['./cotacoes.component.scss']
})
export class CotacoesComponent implements OnInit {

  rates = [];
  loadingRates = true;

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
      this.rates = resolve;
      
      // Ordenando a lista resultante pela data
      this.sortRatesByDate();

      // A API retorna a última data válida antes da data enviada na requisição, o que acaba gerando duplicatas na lista resultante
      this.filterDuplicates();
      
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
  //       this.rates.push(response);
  //       console.log('aux: ', aux, this.rates);

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
    this.rates = this.rates.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  filterDuplicates() {
    let newArray = [this.rates[0]];
    for (let i = 1; i < 7; i++) {
      if (this.rates[i].date != this.rates[i-1].date) newArray.push(this.rates[i]); 
    }
    this.rates = newArray;
  }

}
