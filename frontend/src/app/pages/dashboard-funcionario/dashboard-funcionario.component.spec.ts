import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardFuncionarioComponent } from "./dashboard-funcionario.component";

describe("DashboardFuncionarioComponent", () => {
  let component: DashboardFuncionarioComponent;
  let fixture: ComponentFixture<DashboardFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFuncionarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
