import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostarOrcamentoComponent } from './modal-mostar-orcamento.component';

describe('ModalMostarOrcamentoComponent', () => {
  let component: ModalMostarOrcamentoComponent;
  let fixture: ComponentFixture<ModalMostarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMostarOrcamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMostarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
