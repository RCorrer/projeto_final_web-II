import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiroDialogComponent } from './primeiro-dialog.component';

describe('PrimeiroDialogComponent', () => {
  let component: PrimeiroDialogComponent;
  let fixture: ComponentFixture<PrimeiroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeiroDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeiroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
