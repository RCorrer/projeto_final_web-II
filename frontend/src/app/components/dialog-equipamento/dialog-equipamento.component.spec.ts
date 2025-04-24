import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquipamentoComponent } from './dialog-equipamento.component';

describe('DialogEquipamentoComponent', () => {
  let component: DialogEquipamentoComponent;
  let fixture: ComponentFixture<DialogEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
