import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSkbComponent } from './input-skb.component';

describe('InputSkbComponent', () => {
  let component: InputSkbComponent;
  let fixture: ComponentFixture<InputSkbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSkbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSkbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
