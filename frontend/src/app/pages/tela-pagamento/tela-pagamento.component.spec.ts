import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPagamentoComponent } from './tela-pagamento.component';

describe('TelaPagamentoComponent', () => {
  let component: TelaPagamentoComponent;
  let fixture: ComponentFixture<TelaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
