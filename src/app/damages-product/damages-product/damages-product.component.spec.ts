import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagesProductComponent } from './damages-product.component';

describe('DamagesProductComponent', () => {
  let component: DamagesProductComponent;
  let fixture: ComponentFixture<DamagesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagesProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamagesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
