import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrientacoesComponent } from './modal-orientacoes.component';

describe('ModalOrientacoesComponent', () => {
  let component: ModalOrientacoesComponent;
  let fixture: ComponentFixture<ModalOrientacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrientacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrientacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
