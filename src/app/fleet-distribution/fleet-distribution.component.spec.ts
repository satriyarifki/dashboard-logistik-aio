import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDistributionComponent } from './fleet-distribution.component';

describe('FleetDistributionComponent', () => {
  let component: FleetDistributionComponent;
  let fixture: ComponentFixture<FleetDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
