import { Component, OnInit } from '@angular/core';
import {AtencionSolicitudResponse} from '../../../Models/Response/AtencionSolicitudResponse';
import {Location} from '@angular/common';
import {AtencionSolicitudService} from '../../../Services/atencion-solicitud.service';
import {ActivatedRoute} from '@angular/router';
import {EstadoProcesoSolicitudService} from '../../../Services/estado-proceso-solicitud.service';
import {AccionSolicitudResponse} from '../../../Models/Response/AccionSolicitudResponse';
import {AccionSolicitud} from '../../../Models/Request/AccionSolicitud';

@Component({
  selector: 'app-gestion-solicitud',
  templateUrl: './gestion-solicitud.component.html'
})
export class GestionSolicitudComponent implements OnInit {
  public solicitudAtencionCredito: AtencionSolicitudResponse =new AtencionSolicitudResponse();
  accionSolicitud :AccionSolicitud = new AccionSolicitud();
  listaSolicitud : AccionSolicitudResponse[];
  codigoSolicitud: string;
  comentarioAtencion: string;
  constructor(private _location: Location,
              private atecionSolicitud: AtencionSolicitudService,
              private estadoProcesoSolicitudService: EstadoProcesoSolicitudService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.TraerUno();
    this.estadoProcesoSolicitudService.Listar( this.codigoSolicitud).subscribe(
      response => this.listaSolicitud = response
    );
  }
  backClicked() {
    this._location.back();
  }
  TraerUno():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        this.codigoSolicitud = id;
        if (id) {
          this.atecionSolicitud.TraerUno(id).subscribe(
            response => this.solicitudAtencionCredito = response);
        }
      });
  }
  FinalizaProcesoAtencion()
  {
    this.accionSolicitud.CodigoSolicitud = this.codigoSolicitud;
    this.accionSolicitud.CodigoProceso = '0';
    this.accionSolicitud.Situacion = '0';
    this.accionSolicitud.Comentario = this.comentarioAtencion;
    this.accionSolicitud.UsuarioAtencion = 'alizana';
    this.accionSolicitud.UsuarioTerminal = 'CYRREC04';

    this.estadoProcesoSolicitudService.Finalizar(this.accionSolicitud).subscribe(
      response => console.log(response)
    );
    console.log(this.accionSolicitud);
  }
}
