import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblFohDistributionComponent } from './tbl-foh-distribution.component';

describe('TblFohDistributionComponent', () => {
  let component: TblFohDistributionComponent;
  let fixture: ComponentFixture<TblFohDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblFohDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblFohDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
