import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyComponent } from './input-occupancy.component';

describe('InputOccupancyComponent', () => {
  let component: InputOccupancyComponent;
  let fixture: ComponentFixture<InputOccupancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
