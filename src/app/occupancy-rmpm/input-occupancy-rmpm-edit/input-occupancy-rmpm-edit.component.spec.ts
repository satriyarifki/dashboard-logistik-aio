import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyRmpmEditComponent } from './input-occupancy-rmpm-edit.component';

describe('InputOccupancyRmpmEditComponent', () => {
  let component: InputOccupancyRmpmEditComponent;
  let fixture: ComponentFixture<InputOccupancyRmpmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyRmpmEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyRmpmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
