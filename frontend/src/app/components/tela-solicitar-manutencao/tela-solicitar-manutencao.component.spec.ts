import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSolicitarManutencaoComponent } from './tela-solicitar-manutencao.component';

describe('TelaSolicitarManutencaoComponent', () => {
  let component: TelaSolicitarManutencaoComponent;
  let fixture: ComponentFixture<TelaSolicitarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaSolicitarManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaSolicitarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
