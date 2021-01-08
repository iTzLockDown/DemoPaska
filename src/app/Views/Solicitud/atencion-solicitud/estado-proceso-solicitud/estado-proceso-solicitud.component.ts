import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EstadoProcesoSolicitudService} from '../../../../Services/estado-proceso-solicitud.service';
import {AccionSolicitudResponse} from '../../../../Models/Response/AccionSolicitudResponse';

@Component({
  selector: 'app-estado-proceso-solicitud',
  templateUrl: './estado-proceso-solicitud.component.html',
})
export class EstadoProcesoSolicitudComponent implements OnInit {
  @Input() codigoSolicitud: string;
   accionSolicitud:AccionSolicitudResponse[];
  @Output() estadoModalProceso = new EventEmitter<boolean>();

  constructor(private estadoProcesoSolicitud: EstadoProcesoSolicitudService) { }

  ngOnInit(): void {
    this.estadoProcesoSolicitud.Listar(this.codigoSolicitud).subscribe(
      response => this.accionSolicitud = response
    );
  }
  CerrarBusqueda(){
    this.estadoModalProceso.emit(false);
  }
}
