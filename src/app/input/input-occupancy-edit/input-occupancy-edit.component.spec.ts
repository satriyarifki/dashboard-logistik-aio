import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyEditComponent } from './input-occupancy-edit.component';

describe('InputOccupancyEditComponent', () => {
  let component: InputOccupancyEditComponent;
  let fixture: ComponentFixture<InputOccupancyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
