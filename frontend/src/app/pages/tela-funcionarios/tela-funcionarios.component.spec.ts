import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TelaFuncionariosComponent } from "./tela-funcionarios.component";

describe("TelaFuncionariosComponent", () => {
  let component: TelaFuncionariosComponent;
  let fixture: ComponentFixture<TelaFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaFuncionariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
