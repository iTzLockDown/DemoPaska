import {Component, OnInit, TemplateRef} from '@angular/core';
import {TipoSolicitudService} from '../../Services/tipo-solicitud.service';
import {TipoSolicitudRequest} from '../../Models/Request/TipoSolicitudRequest';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {TipoRequisitoService} from '../../Services/tipo-requisito.service';
import {TipoRequisitoResponse} from '../../Models/Response/TipoRequisitoResponse';
import {TipoRequerimientoRequest} from '../../Models/Request/TipoRequerimientoRequest';
import {TipoSolicitudRequisitoService} from '../../Services/tipo-solicitud-requisito.service';
import {TipoSolicitudResponse} from '../../Models/Response/TipoSolicitudResponse';
import alertifyjs from 'AlertifyJS';
@Component({
  selector: 'app-tipo-solicitud',
  templateUrl: './tipo-solicitud.component.html'
})
export class TipoSolicitudComponent implements OnInit {
  modalRef: BsModalRef;

  oTipoSolicitudRequest: TipoSolicitudRequest;

  tipoSolicitudRequest: TipoSolicitudResponse[];
  tipoRequisitoResponse: TipoRequisitoResponse[];
  req: TipoRequisitoResponse;
  tipoSolicitud: TipoSolicitudRequest;
  requisito: TipoRequisitoResponse;
  requisitosSolicitud: TipoRequisitoResponse;
  requisitos : TipoRequerimientoRequest[];
  constructor(private modalService: BsModalService,
              private tipoSolicitudService: TipoSolicitudService,
              private tipoRequisitoService: TipoRequisitoService,
              private tipoSolicitudRequisitoService: TipoSolicitudRequisitoService
              ) {
    this.tipoSolicitud = new TipoSolicitudRequest();
    this.requisitosSolicitud = new TipoRequisitoResponse();
    this.requisitos =[];
  }

  ngOnInit(): void {
    this.ListarTipoSolicitud();
    this.ListarTipoRequisito();
  }
  Grabar(){
    this.tipoSolicitudService.Grabar(this.tipoSolicitud).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.ListarTipoSolicitud();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
    this.ListarTipoSolicitud()
  }
  Actualizar(){
    console.log('aki');
    this.tipoSolicitudService.Actualizar(this.tipoSolicitud).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.ListarTipoSolicitud();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
    this.ListarTipoSolicitud()
  }
  Eliminar(codigoTipoSolicitud: string)
  {
    this.tipoSolicitudService.Eliminar(codigoTipoSolicitud).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.ListarTipoSolicitud();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }

  agregarRequisito() {
    if (this.requisito == undefined)
    {
      return; }

    if (this.tipoSolicitud.Requisitos.filter(e => e.Codigo == parseInt(this.requisito.toString()) ).length > 0)
    {
      return;
    }

      console.log(this.requisito);
      console.log(this.requisito.NombreRequerimiento);
      // console.log(this.requisito.NombreRequerimiento);
      // this.requisitosSolicitud.Codigo = parseInt(this.requisito.toString());
      // this.tipoSolicitud.Requisitos.push(this.requisitosSolicitud);
      // console.log(this.tipoSolicitud.Requisitos);
  }
  quitarRequisito(requisito: TipoRequisitoResponse) {
    const index = this.tipoSolicitud.Requisitos.indexOf(requisito, 0);
    if (index > -1) {
      this.tipoSolicitud.Requisitos.splice(index, 1);
    }
  }
  ListarTipoSolicitud()
  {
    this.tipoSolicitudService.Listar().subscribe(
      response => this.tipoSolicitudRequest = response
    );
  }
  ListarTipoRequisito()
  {
    this.tipoRequisitoService.Listar().subscribe(
      response => this.tipoRequisitoResponse = response
    );

  }

  agregar(template: TemplateRef<any>) {
    this.tipoSolicitud = new TipoSolicitudRequest();
    this.abrirModal(template);
  }

  editar(tipo: TipoSolicitudResponse, template: TemplateRef<any>) {
    this.tipoSolicitud.CodigoTipoSolicitud = parseInt(tipo.Codigo);
    this.tipoSolicitud.NombreSolicitud = tipo.NombreSolicitud;
    this.tipoSolicitud.DescripcionSolicitud = tipo.DescripcionSolicitud;
    this.tipoSolicitud.Requisitos = [];
    this.tipoSolicitudRequisitoService.Listar( tipo.Codigo)
      .subscribe(
        (res: TipoSolicitudResponse[]) => {

          res.forEach(element => {
            this.req = new TipoRequisitoResponse();
            this.req.Codigo = parseInt(element.CodigoRequisito)
            this.req.NombreRequerimiento = element.NombreRequisito
            this.req.CodigoTipoSolicitud = parseInt(element.CodigoRequisito)
            this.tipoSolicitud.Requisitos.push(this.req)
          })
        }
        , (err) => {
        }
      );
    this.abrirModal(template);

  }


  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }

}
