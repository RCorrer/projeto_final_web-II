import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBaseTemplateComponent } from './card-base-template.component';

describe('CardBaseTemplateComponent', () => {
  let component: CardBaseTemplateComponent;
  let fixture: ComponentFixture<CardBaseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBaseTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
