import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShippingSkbComponent } from './tbl-shipping-skb.component';

describe('TblShippingSkbComponent', () => {
  let component: TblShippingSkbComponent;
  let fixture: ComponentFixture<TblShippingSkbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShippingSkbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShippingSkbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
