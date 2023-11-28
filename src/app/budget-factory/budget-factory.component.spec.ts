import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFactoryComponent } from './budget-factory.component';

describe('BudgetFactoryComponent', () => {
  let component: BudgetFactoryComponent;
  let fixture: ComponentFixture<BudgetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
