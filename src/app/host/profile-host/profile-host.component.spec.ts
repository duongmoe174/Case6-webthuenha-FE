import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHostComponent } from './profile-host.component';

describe('ProfileHostComponent', () => {
  let component: ProfileHostComponent;
  let fixture: ComponentFixture<ProfileHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
