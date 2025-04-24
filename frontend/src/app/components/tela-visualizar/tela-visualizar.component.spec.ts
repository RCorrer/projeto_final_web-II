import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizarComponent } from './tela-visualizar.component';

describe('TelaVisualizarComponent', () => {
  let component: TelaVisualizarComponent;
  let fixture: ComponentFixture<TelaVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaVisualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
