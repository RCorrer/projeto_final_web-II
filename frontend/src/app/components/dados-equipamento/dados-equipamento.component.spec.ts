import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEquipamentoComponent } from './dados-equipamento.component';

describe('DadosEquipamentoComponent', () => {
  let component: DadosEquipamentoComponent;
  let fixture: ComponentFixture<DadosEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
