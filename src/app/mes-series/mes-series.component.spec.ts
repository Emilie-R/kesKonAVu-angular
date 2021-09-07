import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSeriesComponent } from './mes-series.component';

describe('MesSeriesComponent', () => {
  let component: MesSeriesComponent;
  let fixture: ComponentFixture<MesSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
