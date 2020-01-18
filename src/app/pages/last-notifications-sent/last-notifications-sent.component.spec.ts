import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNotificationsSentComponent } from './last-notifications-sent.component';

describe('LastNotificationsSentComponent', () => {
  let component: LastNotificationsSentComponent;
  let fixture: ComponentFixture<LastNotificationsSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNotificationsSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNotificationsSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
