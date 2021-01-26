import { Component, OnInit } from '@angular/core';
import {AtencionSolicitudResponse} from "../../../../Models/Response/AtencionSolicitudResponse";
import {AtencionSolicitudService} from "../../../../Services/atencion-solicitud.service";

@Component({
  selector: 'app-anulado-solicitud',
  templateUrl: './anulado-solicitud.component.html',
})
export class AnuladoSolicitudComponent implements OnInit {

  estadosSolicitudBU: AtencionSolicitudResponse[];
  estadosSolicitud: AtencionSolicitudResponse[];
  constructor(private solicitudAtencion: AtencionSolicitudService) { }

  ngOnInit(): void {
    this.CargarAtencion('alizana');

  }
  CargarAtencion(codigoAsesor: string): void {
    this.solicitudAtencion.ListaTipo(codigoAsesor, '1').subscribe(

      (res: AtencionSolicitudResponse[]) => {
        res.sort((a, b) => (a.Estado > b.Estado ? -1 : 1));
        this.estadosSolicitud = res;
        this.estadosSolicitudBU = res;
        console.log(this.estadosSolicitud)
      }
      , (err) => {
        throw err;
      }
    );
  }
}
