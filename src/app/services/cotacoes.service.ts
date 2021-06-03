import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CotacoesService {

  apiUrl = 'https://api.vatcomply.com';

  constructor(
    private http: HttpClient
  ) { }

  getDayRate(date: string) {
    const params = {
      base: 'USD',
      date: date
    }

    return this.http
      .get<any>(`${this.apiUrl}/rates`, { params: params })
      .pipe(map(dayRates => {
        // Arredondando para três casas decimais
        Object.keys(dayRates.rates).forEach(rate => {
          dayRates.rates[rate] = +dayRates.rates[rate].toFixed(3);
        });
        return dayRates;
      }));
  }

}
