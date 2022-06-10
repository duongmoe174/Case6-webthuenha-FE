import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhostComponent } from './registerhost.component';

describe('RegisterhostComponent', () => {
  let component: RegisterhostComponent;
  let fixture: ComponentFixture<RegisterhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterhostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
