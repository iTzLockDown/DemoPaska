import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import alertifyjs from 'AlertifyJS';
import {SituacionSolicitudService} from '../../Services/situacion-solicitud.service';
import {SituacionResponse} from '../../Models/Response/SituacionResponse';
import {SituacionSolicitudRequest} from '../../Models/Request/SituacionSolicitudRequest';
@Component({
  selector: 'app-situacion-solicitud',
  templateUrl: './situacion-solicitud.component.html'
})
export class SituacionSolicitudComponent implements OnInit {
  modalRef: BsModalRef;
  situacionSolicitudSeleccionado: SituacionResponse;
  listaSituacionSolicitud: SituacionResponse[];
  oEstadoSolicitudRequest: SituacionSolicitudRequest = new SituacionSolicitudRequest();
  constructor(private modalService: BsModalService,
              private situacionSolicitudService: SituacionSolicitudService) { }

  ngOnInit(): void {
    this.Listar();
  }
  Listar(){
    this.situacionSolicitudService.Listar()
      .subscribe( response => this.listaSituacionSolicitud = response);
  }
  Grabar()
  {
    this.AsignarData();

    this.situacionSolicitudService.Grabar(this.oEstadoSolicitudRequest).subscribe(
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
    this.situacionSolicitudService.Actualizar(this.oEstadoSolicitudRequest).subscribe(
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
    this.oEstadoSolicitudRequest.CodigoSolicitud = this.situacionSolicitudSeleccionado.Codigo === undefined?undefined:this.situacionSolicitudSeleccionado.Codigo;
    this.oEstadoSolicitudRequest.Descripcion = this.situacionSolicitudSeleccionado.Descripcion;
    this.oEstadoSolicitudRequest.Usuario = 'ntrucios';
    this.oEstadoSolicitudRequest.Terminal = 'CYRREC04';
  }

  Eliminar(codigoEstado: string)
  {

  }
  agregar(template: TemplateRef<any>) {
    this.situacionSolicitudSeleccionado = new SituacionResponse();
    this.abrirModal(template);
  }


  editar(tipo: SituacionResponse, template: TemplateRef<any>) {
    this.situacionSolicitudSeleccionado = tipo;
    this.abrirModal(template);
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }
}
