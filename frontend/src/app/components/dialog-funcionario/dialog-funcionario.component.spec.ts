import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFuncionarioComponent } from './dialog-funcionario.component';

describe('DialogFuncionarioComponent', () => {
  let component: DialogFuncionarioComponent;
  let fixture: ComponentFixture<DialogFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
