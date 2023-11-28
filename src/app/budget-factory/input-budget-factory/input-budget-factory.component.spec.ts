import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBudgetFactoryComponent } from './input-budget-factory.component';

describe('InputBudgetFactoryComponent', () => {
  let component: InputBudgetFactoryComponent;
  let fixture: ComponentFixture<InputBudgetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBudgetFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBudgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
