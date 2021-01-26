import { Component, OnInit } from '@angular/core';
import {AtencionSolicitudResponse} from "../../../../Models/Response/AtencionSolicitudResponse";
import {AtencionSolicitudService} from "../../../../Services/atencion-solicitud.service";

@Component({
  selector: 'app-enviado-solicitud',
  templateUrl: './enviado-solicitud.component.html',
})
export class EnviadoSolicitudComponent implements OnInit {
  estadosSolicitudBU: AtencionSolicitudResponse[];
  estadosSolicitud: AtencionSolicitudResponse[];
  constructor(private solicitudAtencion: AtencionSolicitudService) { }

  ngOnInit(): void {
    this.CargarAtencion('ntrucios');
  }
  CargarAtencion(codigoAsesor: string): void {
    this.solicitudAtencion.ListaDevuelto(codigoAsesor, '1').subscribe(

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
}
