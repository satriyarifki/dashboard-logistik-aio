import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2ArrivalCreateComponent } from './input-ln2-arrival-create.component';

describe('InputLn2ArrivalCreateComponent', () => {
  let component: InputLn2ArrivalCreateComponent;
  let fixture: ComponentFixture<InputLn2ArrivalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2ArrivalCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2ArrivalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
