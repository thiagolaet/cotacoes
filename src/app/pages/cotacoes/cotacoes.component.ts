import { Component, OnInit } from '@angular/core';
import { CotacoesService } from 'src/app/services/cotacoes.service';

@Component({
  selector: 'app-cotacoes',
  templateUrl: './cotacoes.component.html',
  styleUrls: ['./cotacoes.component.scss']
})
export class CotacoesComponent implements OnInit {

  constructor(
    private cotacoesService: CotacoesService
  ) { }

  ngOnInit() {

  }

}
