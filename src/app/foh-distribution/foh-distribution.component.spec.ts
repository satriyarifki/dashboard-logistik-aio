import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FohDistributionComponent } from './foh-distribution.component';

describe('FohDistributionComponent', () => {
  let component: FohDistributionComponent;
  let fixture: ComponentFixture<FohDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FohDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FohDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
