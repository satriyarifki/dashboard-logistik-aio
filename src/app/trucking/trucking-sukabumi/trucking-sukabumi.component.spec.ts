import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckingSukabumiComponent } from './trucking-sukabumi.component';

describe('TruckingSukabumiComponent', () => {
  let component: TruckingSukabumiComponent;
  let fixture: ComponentFixture<TruckingSukabumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckingSukabumiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckingSukabumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
