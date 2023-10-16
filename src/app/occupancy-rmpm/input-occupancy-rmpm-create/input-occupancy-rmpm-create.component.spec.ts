import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOccupancyRmpmCreateComponent } from './input-occupancy-rmpm-create.component';

describe('InputOccupancyRmpmCreateComponent', () => {
  let component: InputOccupancyRmpmCreateComponent;
  let fixture: ComponentFixture<InputOccupancyRmpmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOccupancyRmpmCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOccupancyRmpmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
