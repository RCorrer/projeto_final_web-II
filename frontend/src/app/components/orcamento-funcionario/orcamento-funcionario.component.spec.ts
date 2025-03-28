import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoFuncionarioComponent } from './orcamento-funcionario.component';

describe('OrcamentoFuncionarioComponent', () => {
  let component: OrcamentoFuncionarioComponent;
  let fixture: ComponentFixture<OrcamentoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
