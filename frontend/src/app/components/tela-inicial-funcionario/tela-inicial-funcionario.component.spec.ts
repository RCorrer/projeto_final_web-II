import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaInicialFuncionarioComponent } from './tela-inicial-funcionario.component';

describe('TelaInicialFuncionarioComponent', () => {
  let component: TelaInicialFuncionarioComponent;
  let fixture: ComponentFixture<TelaInicialFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaInicialFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaInicialFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
