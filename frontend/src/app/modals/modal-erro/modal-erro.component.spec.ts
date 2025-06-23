import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroComponent } from './modal-erro.component';

describe('ModalErroComponent', () => {
  let component: ModalErroComponent;
  let fixture: ComponentFixture<ModalErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalErroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
