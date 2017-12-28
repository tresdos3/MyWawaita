import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorSigninComponent } from './collaborator-signin.component';

describe('CollaboratorSigninComponent', () => {
  let component: CollaboratorSigninComponent;
  let fixture: ComponentFixture<CollaboratorSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
