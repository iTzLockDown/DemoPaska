import { Component, OnInit } from '@angular/core';
import {AtencionSolicitudResponse} from "../../../../Models/Response/AtencionSolicitudResponse";
import {AtencionSolicitudService} from "../../../../Services/atencion-solicitud.service";
import {SituacionResponse} from "../../../../Models/Response/SituacionResponse";
import {TipoSolicitudService} from "../../../../Services/tipo-solicitud.service";
import {TipoSolicitudResponse} from "../../../../Models/Response/TipoSolicitudResponse";

@Component({
  selector: 'app-atendido-solicitud',
  templateUrl: './atendido-solicitud.component.html',
})
export class AtendidoSolicitudComponent implements OnInit {
  tipoSolicitudResponse: TipoSolicitudResponse[];
  objetoSolicitudn: TipoSolicitudResponse;
  estadosSolicitudBU: AtencionSolicitudResponse[];
  estadosSolicitud: AtencionSolicitudResponse[];
  constructor(private solicitudAtencion: AtencionSolicitudService,
              private tipoSolicitudServide: TipoSolicitudService) { }

  ngOnInit(): void {
    this.CargarAtencion('ntrucios');
    this.CargarEstados();
  }

  CargarEstados() {
    this.tipoSolicitudServide.Listar().subscribe(
      respose => this.tipoSolicitudResponse = respose
    );
  }
  CargarAtencion(codigoAsesor: string): void {
    this.solicitudAtencion.ListaAsesorSolicitud(codigoAsesor, '53').subscribe(

      (res: AtencionSolicitudResponse[]) => {
        res.sort((a, b) => (a.Estado > b.Estado ? -1 : 1));
        this.estadosSolicitud = res;
        this.estadosSolicitudBU = res;

      }
      , (err) => {
        throw err;
      }
    );
  }
  Prueba() {
    this.estadosSolicitud = this.estadosSolicitudBU.filter(x => `${x.NombreAsesor}`.toUpperCase().includes(this.objetoSolicitudn.DescripcionSolicitud));
  }
}
