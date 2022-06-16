import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarHostComponent } from './nav-bar-host.component';

describe('NavBarHostComponent', () => {
  let component: NavBarHostComponent;
  let fixture: ComponentFixture<NavBarHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
