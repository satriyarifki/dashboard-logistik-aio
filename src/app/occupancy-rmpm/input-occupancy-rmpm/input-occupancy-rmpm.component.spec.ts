import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyRmpmComponent } from './input-occupancy-rmpm.component';

describe('InputOccupancyRmpmComponent', () => {
  let component: InputOccupancyRmpmComponent;
  let fixture: ComponentFixture<InputOccupancyRmpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyRmpmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyRmpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
