import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviMesFilmsComponent } from './suivi-mes-films.component';

describe('SuiviMesFilmsComponent', () => {
  let component: SuiviMesFilmsComponent;
  let fixture: ComponentFixture<SuiviMesFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviMesFilmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviMesFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
