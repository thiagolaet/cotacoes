import { TestBed } from '@angular/core/testing';

import { CotacoesService } from './cotacoes.service';

describe('CotacoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CotacoesService = TestBed.get(CotacoesService);
    expect(service).toBeTruthy();
  });
});
