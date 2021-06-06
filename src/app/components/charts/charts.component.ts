import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() rates;

  selectedCurrency = 'EUR';
  data = [];
  chartOptions;
  highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
    this.setData();
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
  }

  changeSelectedCurrency(currency: string) {
    this.selectedCurrency = currency;
    this.setData();
  }

}
