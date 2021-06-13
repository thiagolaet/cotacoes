import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DayRates } from '../models/dayRates';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotacoesService {

  constructor(
    private http: HttpClient
  ) { }

  getDayRate(date: string) {
    const params = {
      base: 'USD',
      date: date
    }

    return this.http
      .get<DayRates>(`${environment.vatComply}/rates`, { params: params })
      .pipe(map(dayRates => {
        // Arredondando para três casas decimais
        Object.keys(dayRates.rates).forEach(rate => {
          dayRates.rates[rate] = +dayRates.rates[rate].toFixed(3);
        });
        return dayRates;
      }));
  }

  getWeekRate() {
    return this.http 
      .get<DayRates[]>(`${environment.localAPI}/rates`);
  }

}
