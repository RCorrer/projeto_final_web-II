import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizarSolicitacoesComponent } from './tela-visualizar-solicitacoes.component';

describe('TelaVisualizarSolicitacoesComponent', () => {
  let component: TelaVisualizarSolicitacoesComponent;
  let fixture: ComponentFixture<TelaVisualizarSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaVisualizarSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaVisualizarSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
