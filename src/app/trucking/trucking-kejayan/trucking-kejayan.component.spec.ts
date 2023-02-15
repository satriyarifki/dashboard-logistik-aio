import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckingKejayanComponent } from './trucking-kejayan.component';

describe('TruckingKejayanComponent', () => {
  let component: TruckingKejayanComponent;
  let fixture: ComponentFixture<TruckingKejayanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckingKejayanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckingKejayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
