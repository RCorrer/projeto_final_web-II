import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEquipamentosComponent } from './crud-equipamentos.component';

describe('CrudEquipamentosComponent', () => {
  let component: CrudEquipamentosComponent;
  let fixture: ComponentFixture<CrudEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEquipamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
