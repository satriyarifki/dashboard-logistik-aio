import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2ArrivalEditComponent } from './input-ln2-arrival-edit.component';

describe('InputLn2ArrivalEditComponent', () => {
  let component: InputLn2ArrivalEditComponent;
  let fixture: ComponentFixture<InputLn2ArrivalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2ArrivalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2ArrivalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
