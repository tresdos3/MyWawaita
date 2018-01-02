import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotifyComponent } from './dashboard-notify.component';

describe('DashboardNotifyComponent', () => {
  let component: DashboardNotifyComponent;
  let fixture: ComponentFixture<DashboardNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
