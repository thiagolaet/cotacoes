import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() rates;
  @ViewChild('inputToFocus', { static: false }) inputToFocus: ElementRef;

  selectedCurrency = 'EUR';
  data = [];
  chartOptions;
  highcharts = Highcharts;
  tabs = [{ currency: 'EUR' }, { currency: 'BRL' }, { currency: 'JPY' }];
  
  constructor() { }

  ngOnInit() {  
    // Definindo tema do gráfico 
    Highcharts.setOptions(
      {
        colors: ['#D0992E', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063',
            spacingTop: 90,
            spacingBottom: 50
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          area: {
            fillColor: 'rgba(0, 0, 0, 0.3)',
            lineColor: '#D0992E',
          },
          series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                  fontSize: '13px'
                }
            },
            marker: {
              lineColor: '#333',
              fillColor: '#CACACA'
            }
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          },
          title: {
            style: {
              color: '#C0C0C0'
            }
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },
        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053'
            }
          }
        },
      }
    );

    this.setData();
  }

  setData() {
    this.data = [{
      name: this.selectedCurrency,
      data: []
    }];

    this.chartOptions = {
      chart: {
        type: "area"
      },
      title: {
        text: `USD x ${this.selectedCurrency}`,
      },
      xAxis: {
        categories: [],
        labels: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: this.selectedCurrency,
        }
      },
      series: this.data,
    }

    this.rates.forEach(e => {
      this.data[0].data.push(e.rates[this.selectedCurrency]);
      this.chartOptions.xAxis.categories.push(new Date(e.date + 'T00:00:00').toLocaleDateString('pt-br',
      {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric'
      }));
    });

    // Definindo o menor valor do eixo y no gráfico para melhorar a visualização
    this.chartOptions.yAxis.min = this.findSmallestValue(this.data[0].data) - 0.005;

    console.log(this.data);
  }

  changeSelectedCurrency(currency: string) {
    if (!currency) return;

    this.selectedCurrency = currency;
    this.setData();
  }

  findSmallestValue(array: number[]) {
    let smallest = array[0];
    array.forEach(e => {
      if (e != smallest && e < smallest) smallest = e;
    });
    return smallest;
  }

  createNewTab() {

    // Não adicionar nova aba se a última aba adicionada estiver vazia
    if (this.tabs[this.tabs.length - 1].currency) {
      this.tabs.push({
        currency: ''
      });
    } 

    // Focando no input da nova aba
    setTimeout(() => { 
      this.inputToFocus.nativeElement.focus();
    }, 0);  
  }

  updateTabValue(index: number, event) {
    let newCurrency = event.target.value.toUpperCase();
    this.tabs[index].currency = newCurrency;
    this.selectedCurrency = newCurrency;
    this.setData();
  }

  deleteTab(index: number) {
    this.tabs = this.tabs.filter(e => {
      if (e != this.tabs[index]) return e; 
    });
    if (this.tabs.length) this.changeSelectedCurrency(this.tabs[0].currency);
  }

}
