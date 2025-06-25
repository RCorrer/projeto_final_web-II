import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRedirecionarComponent } from './modal-redirecionar.component';

describe('ModalRedirecionarComponent', () => {
  let component: ModalRedirecionarComponent;
  let fixture: ComponentFixture<ModalRedirecionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRedirecionarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRedirecionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
