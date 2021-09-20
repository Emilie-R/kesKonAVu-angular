import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupNoteComponent } from './followup-note.component';

describe('FollowupNoteComponent', () => {
  let component: FollowupNoteComponent;
  let fixture: ComponentFixture<FollowupNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
