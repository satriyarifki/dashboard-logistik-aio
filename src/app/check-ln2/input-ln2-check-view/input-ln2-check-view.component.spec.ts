import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLn2CheckViewComponent } from './input-ln2-check-view.component';

describe('InputLn2CheckViewComponent', () => {
  let component: InputLn2CheckViewComponent;
  let fixture: ComponentFixture<InputLn2CheckViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputLn2CheckViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLn2CheckViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
