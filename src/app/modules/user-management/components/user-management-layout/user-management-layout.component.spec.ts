import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementLayoutComponent } from './user-management-layout.component';

describe('UserManagementLayoutComponent', () => {
  let component: UserManagementLayoutComponent;
  let fixture: ComponentFixture<UserManagementLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
