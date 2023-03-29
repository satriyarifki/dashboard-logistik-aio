import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLn2Component } from './check-ln2.component';

describe('CheckLn2Component', () => {
  let component: CheckLn2Component;
  let fixture: ComponentFixture<CheckLn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckLn2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
