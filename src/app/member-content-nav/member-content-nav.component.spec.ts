import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContentNavComponent } from './member-content-nav.component';

describe('MemberContentNavComponent', () => {
  let component: MemberContentNavComponent;
  let fixture: ComponentFixture<MemberContentNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberContentNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
