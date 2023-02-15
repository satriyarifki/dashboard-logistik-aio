import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelDesKejayanComponent } from './del-des-kejayan.component';

describe('DelDesKejayanComponent', () => {
  let component: DelDesKejayanComponent;
  let fixture: ComponentFixture<DelDesKejayanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelDesKejayanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelDesKejayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
