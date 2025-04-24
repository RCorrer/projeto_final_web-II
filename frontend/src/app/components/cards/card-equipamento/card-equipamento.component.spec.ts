import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEquipamentoComponent } from './card-equipamento.component';

describe('CardEquipamentoComponent', () => {
  let component: CardEquipamentoComponent;
  let fixture: ComponentFixture<CardEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEquipamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
