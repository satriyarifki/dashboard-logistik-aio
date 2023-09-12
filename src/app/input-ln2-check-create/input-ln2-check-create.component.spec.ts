import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2CheckCreateComponent } from './input-ln2-check-create.component';

describe('InputLn2CheckCreateComponent', () => {
  let component: InputLn2CheckCreateComponent;
  let fixture: ComponentFixture<InputLn2CheckCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2CheckCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2CheckCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
