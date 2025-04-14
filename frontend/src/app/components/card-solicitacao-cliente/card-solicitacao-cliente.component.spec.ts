import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSolicitacaoClienteComponent } from './card-solicitacao-cliente.component';

describe('CardSolicitacaoClienteComponent', () => {
  let component: CardSolicitacaoClienteComponent;
  let fixture: ComponentFixture<CardSolicitacaoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSolicitacaoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSolicitacaoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
