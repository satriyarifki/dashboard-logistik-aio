import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputKjyComponent } from './input-kjy.component';

describe('InputKjyComponent', () => {
  let component: InputKjyComponent;
  let fixture: ComponentFixture<InputKjyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputKjyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputKjyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
