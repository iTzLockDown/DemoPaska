import { Component, OnInit } from '@angular/core';
import {AtencionSolicitudResponse} from '../../../../Models/Response/AtencionSolicitudResponse';
import {Location} from '@angular/common';
import {AtencionSolicitudService} from '../../../../Services/atencion-solicitud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EstadoProcesoSolicitudService} from '../../../../Services/estado-proceso-solicitud.service';
import {AccionSolicitudResponse} from '../../../../Models/Response/AccionSolicitudResponse';
import {AccionSolicitud} from '../../../../Models/Request/AccionSolicitud';
import alertifyjs from 'AlertifyJS';
import {ProcesoSolicitudService} from "../../../../Services/proceso-solicitud.service";
import {ProcesoSolicitudResponse} from "../../../../Models/Response/ProcesoSolicitudResponse";
import {GarantiaService} from "../../../../Services/garantia.service";
import {SolicitudRequisitoResponse} from "../../../../Models/Response/SolicitudRequisitoResponse";
import {SolicitudGarantiaResponse} from "../../../../Models/Response/SolicitudGarantiaResponse";
@Component({
  selector: 'app-gestion-solicitud',
  templateUrl: './gestion-solicitud.component.html'
})
export class GestionSolicitudComponent implements OnInit {
  public solicitudAtencionCredito: AtencionSolicitudResponse = new AtencionSolicitudResponse();
  accionSolicitud: AccionSolicitud = new AccionSolicitud();
  listaSolicitud: AccionSolicitudResponse[];
  oAccionSolicitudResponse: AccionSolicitudResponse;
  solicitudRequisitoResponse: SolicitudRequisitoResponse[];
  procesoSolicitudResponse: ProcesoSolicitudResponse[];
  solicitudGarantiaResponse: SolicitudGarantiaResponse[];
  const // @ts-ignore
  skills = [
    {
      id: 1,
      Descripcion: "APROBADO"
    },
    {
      id: 2,
      Descripcion: "DENEGADO"
    },
    {
      id: 3,
      Descripcion: "ANULADO"
    }
  ];
  codigoSolicitud: string;
  comentarioAtencion: string;
  constructor(private _location: Location,
              private atecionSolicitud: AtencionSolicitudService,
              private router: Router,
              private estadoProcesoSolicitudService: EstadoProcesoSolicitudService,
              private procesoSolicitudService : ProcesoSolicitudService,
              private activatedRoute: ActivatedRoute,
              private garantiaService : GarantiaService) {
    this.oAccionSolicitudResponse = new AccionSolicitudResponse();
  }

  ngOnInit(): void {

    this.TraerUno();
    this.procesoSolicitudService.ListarCodigo('53').subscribe(
      response => this.procesoSolicitudResponse = response
    );
    this.CargarGarantia();
    this.CargarRequisito();
  }
  backClicked() {
    this._location.back();
  }
  TraerUno(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        this.codigoSolicitud = id;
        if (id) {
          this.atecionSolicitud.TraerUno(id).subscribe(
            response => {
              this.solicitudAtencionCredito = response,
                console.log(this.solicitudAtencionCredito);
            }
          );
        }
      });

  }
  FinalizaProcesoAtencion() {


    this.accionSolicitud.CodigoSolicitud = this.codigoSolicitud;

    this.accionSolicitud.Comentario = this.comentarioAtencion;
    this.accionSolicitud.UsuarioAtencion = 'alizana';
    this.accionSolicitud.UsuarioTerminal = 'CYRREC04';

    this.estadoProcesoSolicitudService.Finalizar(this.accionSolicitud).subscribe(
      response => {
        console.log(response),
          this.router.navigate(['/dashboard/listarsolicitud']),
          alertifyjs.success('Se registro la solicitud de Atencion.!!');
      }

    );
    console.log(this.accionSolicitud);
  }
    onChange(valor)
    {
      if (valor === 'APROBADO'){
        this.accionSolicitud.CodigoProceso = '0';
        this.accionSolicitud.Situacion = '0';
      }
      if (valor === 'DENEGADO'){
        this.accionSolicitud.CodigoProceso = this.oAccionSolicitudResponse.CodigoProceso;
        this.accionSolicitud.Situacion = '0';
      }
      if (valor === 'ANULADO'){
        this.accionSolicitud.CodigoProceso = '1';
        this.accionSolicitud.Situacion = '1';
      }
    }
  CargarGarantia()
  {
    this.garantiaService.SolicitudGarantia(this.codigoSolicitud).subscribe(

    response => {
      this.solicitudGarantiaResponse = response
    }
    );
  }
  CargarRequisito()
  {
    this.garantiaService.SolicitudRequisito(this.codigoSolicitud).subscribe(
          response => {
            this.solicitudRequisitoResponse = response
          }
    );
  }
}
