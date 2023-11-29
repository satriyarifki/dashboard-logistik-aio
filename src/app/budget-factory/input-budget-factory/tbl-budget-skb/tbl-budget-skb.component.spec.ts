import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBudgetSkbComponent } from './tbl-budget-skb.component';

describe('TblBudgetSkbComponent', () => {
  let component: TblBudgetSkbComponent;
  let fixture: ComponentFixture<TblBudgetSkbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblBudgetSkbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblBudgetSkbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
