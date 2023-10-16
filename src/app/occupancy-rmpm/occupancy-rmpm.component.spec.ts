import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyRmpmComponent } from './occupancy-rmpm.component';

describe('OccupancyRmpmComponent', () => {
  let component: OccupancyRmpmComponent;
  let fixture: ComponentFixture<OccupancyRmpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyRmpmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyRmpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
