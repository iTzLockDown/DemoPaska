import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionSolicitudComponent } from './situacion-solicitud.component';

describe('SituacionSolicitudComponent', () => {
  let component: SituacionSolicitudComponent;
  let fixture: ComponentFixture<SituacionSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacionSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
