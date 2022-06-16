import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookHouseComponent } from './user-book-house.component';

describe('UserBookHouseComponent', () => {
  let component: UserBookHouseComponent;
  let fixture: ComponentFixture<UserBookHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
