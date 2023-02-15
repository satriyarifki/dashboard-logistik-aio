import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelDesSukabumiComponent } from './del-des-sukabumi.component';

describe('DelDesSukabumiComponent', () => {
  let component: DelDesSukabumiComponent;
  let fixture: ComponentFixture<DelDesSukabumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelDesSukabumiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelDesSukabumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
