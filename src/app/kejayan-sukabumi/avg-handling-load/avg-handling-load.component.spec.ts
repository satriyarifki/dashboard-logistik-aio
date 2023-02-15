import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgHandlingLoadComponent } from './avg-handling-load.component';

describe('AvgHandlingLoadComponent', () => {
  let component: AvgHandlingLoadComponent;
  let fixture: ComponentFixture<AvgHandlingLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgHandlingLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgHandlingLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
