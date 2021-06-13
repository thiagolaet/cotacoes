import { Component, OnInit } from '@angular/core';
import { CotacoesService } from 'src/app/services/cotacoes.service';

@Component({
  selector: 'app-cotacoes-api',
  templateUrl: './cotacoes-api.component.html',
  styleUrls: ['./cotacoes-api.component.scss']
})
export class CotacoesApiComponent implements OnInit {

  rates = [];
  loadingRates = true;

  constructor(
    private cotacoesService: CotacoesService
  ) { }

  ngOnInit() {
    this.getWeekRates();
  }

  getWeekRates() {
    this.cotacoesService.getWeekRate().subscribe(resolve => {
      this.rates = resolve;
      this.loadingRates = false;
    },
    error => {
      console.log(error);
      this.loadingRates = false;
    });
  }

}
