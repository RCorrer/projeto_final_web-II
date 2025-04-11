import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TelaEquipamentosComponent } from "./tela-equipamentos.component";

describe("TelaEquipamentosComponent", () => {
  let component: TelaEquipamentosComponent;
  let fixture: ComponentFixture<TelaEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEquipamentosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
