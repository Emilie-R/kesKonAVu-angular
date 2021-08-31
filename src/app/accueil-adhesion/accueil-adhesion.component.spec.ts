import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdhesionComponent } from './accueil-adhesion.component';

describe('AccueilAdhesionComponent', () => {
  let component: AccueilAdhesionComponent;
  let fixture: ComponentFixture<AccueilAdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilAdhesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
