import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSkbEditComponent } from './input-skb-edit.component';

describe('InputSkbEditComponent', () => {
  let component: InputSkbEditComponent;
  let fixture: ComponentFixture<InputSkbEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSkbEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSkbEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
