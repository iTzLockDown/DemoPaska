import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTipoSolicitudComponent } from './formulario-tipo-solicitud.component';

describe('FormularioTipoSolicitudComponent', () => {
  let component: FormularioTipoSolicitudComponent;
  let fixture: ComponentFixture<FormularioTipoSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTipoSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTipoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
