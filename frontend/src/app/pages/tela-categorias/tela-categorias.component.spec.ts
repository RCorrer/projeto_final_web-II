import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TelaCategoriasComponent } from "./tela-categorias.component";

describe("TelaCategoriasComponent", () => {
  let component: TelaCategoriasComponent;
  let fixture: ComponentFixture<TelaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCategoriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
