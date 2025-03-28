import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSolicitacaoComponent } from './card-solicitacao.component';

describe('CardSolicitacaoComponent', () => {
  let component: CardSolicitacaoComponent;
  let fixture: ComponentFixture<CardSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
