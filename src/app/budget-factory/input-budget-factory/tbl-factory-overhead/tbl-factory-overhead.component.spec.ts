import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblFactoryOverheadComponent } from './tbl-factory-overhead.component';

describe('TblFactoryOverheadComponent', () => {
  let component: TblFactoryOverheadComponent;
  let fixture: ComponentFixture<TblFactoryOverheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblFactoryOverheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblFactoryOverheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
