import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EstadoSolicitudService} from '../../Services/estado-solicitud.service';
import {EstadoResponse} from '../../Models/Response/EstadoResponse';
import {EstadoSolicitudRequest} from '../../Models/Request/EstadoSolicitudRequest';
import alertifyjs from 'AlertifyJS';
@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html'
})
export class EstadoSolicitudComponent implements OnInit {
  modalRef: BsModalRef;
  estadoSolicitudSeleccionado: EstadoResponse;
  listaEstadoSolicitud: EstadoResponse[];
  oEstadoSolicitudRequest: EstadoSolicitudRequest = new EstadoSolicitudRequest();
  constructor(private modalService: BsModalService,
              private estadoSolicitudService: EstadoSolicitudService) {
  }

  ngOnInit(): void {
    this.Listar();
  }
  Listar(){
    this.estadoSolicitudService.Listar()
      .subscribe( response => this.listaEstadoSolicitud = response);
  }
  Grabar()
  {
    this.AsignarData();
    this.estadoSolicitudService.Grabar(this.oEstadoSolicitudRequest).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.Listar();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }
  Actualiza()
  {
    this.AsignarData();
    this.estadoSolicitudService.Actualizar(this.oEstadoSolicitudRequest).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.Listar();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }
  AsignarData()
  {
    this.oEstadoSolicitudRequest.CodigoEstado = this.estadoSolicitudSeleccionado.CodigoEstado === undefined?undefined:this.estadoSolicitudSeleccionado.CodigoEstado;
    this.oEstadoSolicitudRequest.Descripcion = this.estadoSolicitudSeleccionado.Descripcion;
    this.oEstadoSolicitudRequest.Usuario = 'ntrucios';
    this.oEstadoSolicitudRequest.Terminal = 'CYRREC04';
  }

  Eliminar(codigoEstado: string)
  {
    this.oEstadoSolicitudRequest.CodigoEstado = codigoEstado.toString();
    this.oEstadoSolicitudRequest.Usuario = 'ntrucios';
    this.oEstadoSolicitudRequest.Terminal = 'CYRREC04';
    this.estadoSolicitudService.Eliminar(this.oEstadoSolicitudRequest).subscribe(
      (res: boolean) => {
        if (res){
          alertifyjs.warning('¡Operación exitosa!');
          this.Listar();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }
  agregar(template: TemplateRef<any>) {
    this.estadoSolicitudSeleccionado = new EstadoResponse();
    this.abrirModal(template);
  }


  editar(tipo: EstadoResponse, template: TemplateRef<any>) {
    this.estadoSolicitudSeleccionado = tipo;
    this.abrirModal(template);
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }
}
