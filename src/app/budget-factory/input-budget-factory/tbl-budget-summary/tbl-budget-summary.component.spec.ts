import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBudgetSummaryComponent } from './tbl-budget-summary.component';

describe('TblBudgetSummaryComponent', () => {
  let component: TblBudgetSummaryComponent;
  let fixture: ComponentFixture<TblBudgetSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblBudgetSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblBudgetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
