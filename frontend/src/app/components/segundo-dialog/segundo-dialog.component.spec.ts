import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoDialogComponent } from './segundo-dialog.component';

describe('SegundoDialogComponent', () => {
  let component: SegundoDialogComponent;
  let fixture: ComponentFixture<SegundoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
