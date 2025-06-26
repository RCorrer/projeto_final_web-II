import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoRejeicaoComponent } from './modal-motivo-rejeicao.component';

describe('ModalMotivoRejeicaoComponent', () => {
  let component: ModalMotivoRejeicaoComponent;
  let fixture: ComponentFixture<ModalMotivoRejeicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMotivoRejeicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMotivoRejeicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
