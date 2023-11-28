import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShippingKjyComponent } from './tbl-shipping-kjy.component';

describe('TblShippingKjyComponent', () => {
  let component: TblShippingKjyComponent;
  let fixture: ComponentFixture<TblShippingKjyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShippingKjyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShippingKjyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
