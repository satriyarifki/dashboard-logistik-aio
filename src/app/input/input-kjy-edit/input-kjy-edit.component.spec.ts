import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputKjyEditComponent } from './input-kjy-edit.component';

describe('InputKjyEditComponent', () => {
  let component: InputKjyEditComponent;
  let fixture: ComponentFixture<InputKjyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputKjyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputKjyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
