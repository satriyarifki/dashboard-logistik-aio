import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvenAccuracyComponent } from './inven-accuracy.component';

describe('InvenAccuracyComponent', () => {
  let component: InvenAccuracyComponent;
  let fixture: ComponentFixture<InvenAccuracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvenAccuracyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvenAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
