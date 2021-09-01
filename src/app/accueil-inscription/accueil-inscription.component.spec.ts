import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilInscriptionComponent } from './accueil-inscription.component';

describe('AccueilInscriptionComponent', () => {
  let component: AccueilInscriptionComponent;
  let fixture: ComponentFixture<AccueilInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
