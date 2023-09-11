import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2Component } from './input-ln2.component';

describe('InputLn2Component', () => {
  let component: InputLn2Component;
  let fixture: ComponentFixture<InputLn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
