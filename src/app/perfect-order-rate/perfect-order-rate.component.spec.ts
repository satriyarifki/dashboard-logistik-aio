import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectOrderRateComponent } from './perfect-order-rate.component';

describe('PerfectOrderRateComponent', () => {
  let component: PerfectOrderRateComponent;
  let fixture: ComponentFixture<PerfectOrderRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfectOrderRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfectOrderRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
