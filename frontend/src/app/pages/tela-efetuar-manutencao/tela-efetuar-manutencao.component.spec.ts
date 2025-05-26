import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEfetuarManutencaoComponent } from './tela-efetuar-manutencao.component';

describe('TelaEfetuarManutencaoComponent', () => {
  let component: TelaEfetuarManutencaoComponent;
  let fixture: ComponentFixture<TelaEfetuarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEfetuarManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEfetuarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
