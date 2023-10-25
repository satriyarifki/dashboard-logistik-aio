import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2CheckEditComponent } from './input-ln2-check-edit.component';

describe('InputLn2CheckEditComponent', () => {
  let component: InputLn2CheckEditComponent;
  let fixture: ComponentFixture<InputLn2CheckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2CheckEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2CheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
