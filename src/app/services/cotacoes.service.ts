import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CotacoesService {

  constructor(
    private http: HttpClient
  ) { }

}
