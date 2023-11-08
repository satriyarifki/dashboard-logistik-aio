import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmpmCollectionComponent } from './rmpm-collection.component';

describe('RmpmCollectionComponent', () => {
  let component: RmpmCollectionComponent;
  let fixture: ComponentFixture<RmpmCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmpmCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmpmCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
