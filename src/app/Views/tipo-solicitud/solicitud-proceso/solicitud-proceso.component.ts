import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcesoSolicitudService} from '../../../Services/proceso-solicitud.service';
import {ProcesoSolicitudResponse} from '../../../Models/Response/ProcesoSolicitudResponse';
import alertifyjs from 'AlertifyJS';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AgregarProcesoRequest} from '../../../Models/Request/AgregarProcesoRequest';
@Component({
  selector: 'app-solicitud-proceso',
  templateUrl: './solicitud-proceso.component.html'
})
export class SolicitudProcesoComponent implements OnInit {
  orden : number;
  procesoSolicitudSeleccionado: ProcesoSolicitudResponse;
  procesoSolicitudResponse: ProcesoSolicitudResponse[];
  agregarProceso: AgregarProcesoRequest = new AgregarProcesoRequest();
  listaProcesoSolicitud: ProcesoSolicitudResponse[];
  codigoSolicitud: number;
  codigoProceso: string ='';
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
              private procesoSolicitudService: ProcesoSolicitudService) {
    this.procesoSolicitudSeleccionado = new ProcesoSolicitudResponse();
  }

  ngOnInit(): void {
    this.ListarProcesos();
    this.Listar();
  }
  ListarProcesos()
  {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        this.codigoSolicitud = id;
        if (id) {
          this.procesoSolicitudService.ListarCodigo(id).subscribe(
            response => this.procesoSolicitudResponse = response)

        }
      });
  }
  Listar() {
    this.procesoSolicitudService.Listar()
      .subscribe(
        response => this.listaProcesoSolicitud = response
      );
  }
  Grabar()
  {
    this.agregarProceso.CodigoProceso = parseInt(this.codigoProceso);
    this.agregarProceso.CodigoSolicitud = this.codigoSolicitud;
    this.agregarProceso.Usuario = 'ntrucios';
    this.agregarProceso.Terminal = 'CYREREC09';

    this.procesoSolicitudService.AgregarProceso( this.agregarProceso).subscribe(
      (res: boolean) => {
        if (res){
          this.modalRef.hide();
          alertifyjs.success('¡Operación exitosa!');
          this.ListarProcesos();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }
  agregar(template: TemplateRef<any>) {
    this.procesoSolicitudSeleccionado = new ProcesoSolicitudResponse();
    this.abrirModal(template);
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }

  EliminarProceso(codigoTipoProceso: string , numeroOrden: string) {
    this.agregarProceso.CodigoProceso = parseInt(codigoTipoProceso);
    this.agregarProceso.CodigoSolicitud = this.codigoSolicitud;
    this.agregarProceso.PosicionesSolicitud =parseInt(numeroOrden);
    this.agregarProceso.Usuario = 'ntrucios';
    this.agregarProceso.Terminal = 'CYREREC09';

    this.procesoSolicitudService.EliminarProceso(this.agregarProceso).subscribe(
      (res: boolean) => {
        if (res){
          alertifyjs.success('¡Operación exitosa!');
          this.ListarProcesos();
        }
      }
      , (err) => {
        alertifyjs.error('Error, verificar informacion.');
      }
    );
  }

}
