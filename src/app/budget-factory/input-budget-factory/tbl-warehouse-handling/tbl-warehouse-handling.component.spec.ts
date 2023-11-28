import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblWarehouseHandlingComponent } from './tbl-warehouse-handling.component';

describe('TblWarehouseHandlingComponent', () => {
  let component: TblWarehouseHandlingComponent;
  let fixture: ComponentFixture<TblWarehouseHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblWarehouseHandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblWarehouseHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
