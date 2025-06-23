import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEfetuarManutencaoComponent } from './modal-efetuar-manutencao.component';

describe('ModalEfetuarManutencaoComponent', () => {
  let component: ModalEfetuarManutencaoComponent;
  let fixture: ComponentFixture<ModalEfetuarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEfetuarManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEfetuarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
