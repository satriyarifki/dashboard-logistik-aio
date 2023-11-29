import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBudgetKjyComponent } from './tbl-budget-kjy.component';

describe('TblBudgetKjyComponent', () => {
  let component: TblBudgetKjyComponent;
  let fixture: ComponentFixture<TblBudgetKjyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblBudgetKjyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblBudgetKjyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
