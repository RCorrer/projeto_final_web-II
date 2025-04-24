import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRelatorioComponent } from './tela-relatorio.component';

describe('TelaRelatorioComponent', () => {
  let component: TelaRelatorioComponent;
  let fixture: ComponentFixture<TelaRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
