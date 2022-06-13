import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEditStatusComponent } from './house-edit-status.component';

describe('HouseEditStatusComponent', () => {
  let component: HouseEditStatusComponent;
  let fixture: ComponentFixture<HouseEditStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEditStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
