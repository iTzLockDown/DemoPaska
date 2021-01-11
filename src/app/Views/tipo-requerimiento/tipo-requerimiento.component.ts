import { Component, OnInit, TemplateRef } from '@angular/core';
import {TipoRequisitoService} from '../../Services/tipo-requisito.service';
import {TipoRequisitoResponse} from '../../Models/Response/TipoRequisitoResponse';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {TipoRequerimientoRequest} from '../../Models/Request/TipoRequerimientoRequest';
import alertifyjs from 'AlertifyJS';
@Component({
  selector: 'app-tipo-requerimiento',
  templateUrl: './tipo-requerimiento.component.html',
})
export class TipoRequerimientoComponent implements OnInit {
  modalRef: BsModalRef;
  tipoRequisitoSeleccionado=new TipoRequisitoResponse();
  tipoRequisitos: TipoRequisitoResponse[];
  tipoRequisitoRequest : TipoRequerimientoRequest=new TipoRequerimientoRequest();
  estadoModal:boolean= false;

  constructor( private modalService: BsModalService,
               private tipoRequisitoService: TipoRequisitoService) { }
  ngOnInit(): void {
    this.Listar();
  }

  Listar()
  {
    this.tipoRequisitoService.Listar().subscribe(
      response => this.tipoRequisitos = response
    );
  }

  guardarTipoRequerimiento() {

    this.tipoRequisitoRequest.CodigoTipoSolicitud = this.tipoRequisitoSeleccionado.Codigo>0?this.tipoRequisitoSeleccionado.Codigo:0;
    this.tipoRequisitoRequest.NombreSolicitud = this.tipoRequisitoSeleccionado.NombreRequerimiento;
    this.tipoRequisitoRequest.UsuarioConsulta = "ntrucios";
    this.tipoRequisitoRequest.TerminalConsulta = "CYRREC09";
    this.tipoRequisitoService.Grabar(this.tipoRequisitoRequest).subscribe(
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

  Eliminar(codigoRequerimiento :number){
    this.tipoRequisitoService.Eliminar(codigoRequerimiento).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
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
    this.tipoRequisitoSeleccionado = new TipoRequisitoResponse();
    this.abrirModal(template);
  }

  editar(tipo: TipoRequisitoResponse, template: TemplateRef<any>) {
    this.tipoRequisitoSeleccionado = tipo;
    this.abrirModal(template);
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }
}
