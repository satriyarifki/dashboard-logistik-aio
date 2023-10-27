import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2ArrivalViewComponent } from './input-ln2-arrival-view.component';

describe('InputLn2ArrivalViewComponent', () => {
  let component: InputLn2ArrivalViewComponent;
  let fixture: ComponentFixture<InputLn2ArrivalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2ArrivalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2ArrivalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
