import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesFilmsComponent } from './mes-films.component';

describe('MesFilmsComponent', () => {
  let component: MesFilmsComponent;
  let fixture: ComponentFixture<MesFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesFilmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
