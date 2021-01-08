import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtencionSolicitudResponse} from '../../../Models/Response/AtencionSolicitudResponse';
import {AtencionSolicitudService} from '../../../Services/atencion-solicitud.service';
import {EstadoProcesoSolicitudService} from '../../../Services/estado-proceso-solicitud.service';
import {AccionSolicitud} from '../../../Models/Request/AccionSolicitud';

@Component({
  selector: 'app-atencion-solicitud',
  templateUrl: './atencion-solicitud.component.html',
})
export class AtencionSolicitudComponent implements OnInit {
  estadoModalProceso:boolean=false;
  public accionSolicitud: AccionSolicitud =new AccionSolicitud();
  atencionSolicitud : AtencionSolicitudResponse[];
  codigoSolicitud : string;
  constructor(private router: Router,
              private solicitudAtencion: AtencionSolicitudService,
              private estadoProcesoSolicitud: EstadoProcesoSolicitudService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.CargarAtencion('asasd');
  }
  CargarAtencion(codigoAsesor: string):void{
    this.solicitudAtencion.Lista(codigoAsesor).subscribe(
      response => this.atencionSolicitud = response
    );
  }

  IniciarAccion(codigoSolicitud: string): void
  {
    this.accionSolicitud.CodigoSolicitud = codigoSolicitud;
    this.accionSolicitud.UsuarioAtencion = 'ntrucios';
    this.accionSolicitud.UsuarioTerminal = 'CYRREC04';

    this.estadoProcesoSolicitud.Iniciar( this.accionSolicitud).subscribe(
      response => console.log(response)
    );
  }
  AbrirCreditoCliente(codigoSolicitud:string){
    this.estadoModalProceso = true;
    this.codigoSolicitud = codigoSolicitud;
  }
  CerrarCreditoCliente($event){
    this.estadoModalProceso = $event;
  }
}
