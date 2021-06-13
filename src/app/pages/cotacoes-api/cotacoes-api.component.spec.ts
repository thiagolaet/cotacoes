import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacoesApiComponent } from './cotacoes-api.component';

describe('CotacoesApiComponent', () => {
  let component: CotacoesApiComponent;
  let fixture: ComponentFixture<CotacoesApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacoesApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacoesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
