import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosFuncionarioComponent } from './dados-funcionario.component';

describe('DadosFuncionarioComponent', () => {
  let component: DadosFuncionarioComponent;
  let fixture: ComponentFixture<DadosFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
