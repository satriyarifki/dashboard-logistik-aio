import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyRmpmViewComponent } from './input-occupancy-rmpm-view.component';

describe('InputOccupancyRmpmViewComponent', () => {
  let component: InputOccupancyRmpmViewComponent;
  let fixture: ComponentFixture<InputOccupancyRmpmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyRmpmViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyRmpmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
