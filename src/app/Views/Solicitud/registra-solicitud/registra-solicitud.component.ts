import {Component, OnInit, TemplateRef} from '@angular/core';
import {ClienteResponse} from '../../../Models/Response/ClienteResponse';
import {BuscarClienteService} from '../../../Services/buscar-cliente.service';
import {CreditoClienteResponse} from '../../../Models/Response/CreditoClienteResponse';
import {TipoSolicitudService} from '../../../Services/tipo-solicitud.service';
import {TipoSolicitudRequisitoService} from '../../../Services/tipo-solicitud-requisito.service';
import {RequisitosRequest} from '../../../Models/Request/RequisitosRequest';
import {SituacionSolicitudService} from '../../../Services/situacion-solicitud.service';
import {EstadoSolicitudService} from '../../../Services/estado-solicitud.service';
import {EstadoResponse} from '../../../Models/Response/EstadoResponse';
import {SituacionResponse} from '../../../Models/Response/SituacionResponse';
import {AtencionSolicitudRequest} from '../../../Models/Request/AtencionSolicitudRequest';
import {AtencionSolicitudService} from '../../../Services/atencion-solicitud.service';
import {GarantiaRequest} from '../../../Models/Request/GarantiaRequest';
import alertifyjs from 'AlertifyJS';
import {Router} from '@angular/router';
import {TipoSolicitudResponse} from '../../../Models/Response/TipoSolicitudResponse';
import {TipoSolicitudRequisitoResponse} from '../../../Models/Response/TipoSolicitudRequisitoResponse';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {GarantiaService} from '../../../Services/garantia.service';
import {GarantiaLineaCredito} from '../../../Models/Response/GarantiaLineaCredito';
import {DatoGarantiaResponse} from '../../../Models/Response/DatoGarantiaResponse';
import {TipoRequisitoResponse} from "../../../Models/Response/TipoRequisitoResponse";
@Component({
  selector: 'app-registra-solicitud',
  templateUrl: './registra-solicitud.component.html'
})
export class RegistraSolicitudComponent implements OnInit {
  atencionSolicitud: AtencionSolicitudRequest;
  estadoModal: boolean = false;
  estadoModalCredito: boolean = false;
  clienteData: ClienteResponse = new ClienteResponse();
  creditoInformacion: CreditoClienteResponse[];
  textoDeInput: string = null;
  codigoCliente: string;
  listaTipoSolicitud: TipoSolicitudResponse[];
  listaTipoSolicitudRequerimiento: TipoSolicitudRequisitoResponse[];
  opcionSolicitud: any;
  requisitos: RequisitosRequest;
  requisitosSolicitud: RequisitosRequest[] = [];
  garantia: GarantiaRequest;
  garantias: GarantiaRequest[] = [];
  coditoTipoSolicitud: string;
  estadoSolicitud: EstadoResponse[];
  situacionSolicitud: SituacionResponse[];
  creditoData: CreditoClienteResponse = new CreditoClienteResponse();
  private archivoSeleccionado: File;
  recibeCodigo:string = '';
  modalRef: BsModalRef;
  garantiaLineaCredito: GarantiaLineaCredito[];
  datoGarantiaResponse: DatoGarantiaResponse[];
  objetoGarantia: DatoGarantiaResponse;
  constructor(private modalService: BsModalService,
              private router: Router,
              private buscarCliente: BuscarClienteService,
              private tipoSolicitud: TipoSolicitudService,
              private tipoSolicitudRequerimineto: TipoSolicitudRequisitoService,
              private situacionSolicitudService: SituacionSolicitudService,
              private estadoSolicitudService: EstadoSolicitudService,
              private atencionSolicitudService: AtencionSolicitudService,
              private garantiaService: GarantiaService) {
    this.atencionSolicitud = new AtencionSolicitudRequest();
  }

  ngOnInit(): void {
    this.tipoSolicitud.Listar().subscribe(
      response => this.listaTipoSolicitud = response
    );

    this.estadoSolicitudService.Listar().subscribe(
      response => this.estadoSolicitud = response
    );
    this.situacionSolicitudService.Listar().subscribe(
      response => this.situacionSolicitud = response
    );
  }

  AbrirBusquedaCliente() {
    this.estadoModal = true;
  }
  AbrirCreditoCliente(codigoCliente: string) {
    this.estadoModalCredito = true;
    this.codigoCliente = codigoCliente;
  }
  CerrarBusquedaCliente($event) {
    this.estadoModal = $event;
    this.CargarCredito(this.clienteData.CodigoCliente);
    this.DatoGarantia(this.clienteData.CodigoCliente, '002');
    this.LimpiaArray();
  }
  CerrarCreditoCliente($event) {
    this.estadoModalCredito = $event;
  }
  RecibirCodigoCredito($event) {
    this.recibeCodigo = $event;
  }
  ClienteSeleccionado($event) {
    this.clienteData = $event;
  }
  CargarCredito(codigoCliente: string) {
    this.buscarCliente.BuscaCredito(codigoCliente)
      .subscribe( (response: CreditoClienteResponse[]) => {
          this.creditoData = response[0] as CreditoClienteResponse
        }
      );
  }

  TraerRequisitos(codigoTipoSolicitud: string) {
    this.coditoTipoSolicitud = codigoTipoSolicitud;
    this.tipoSolicitudRequerimineto.Listar(codigoTipoSolicitud)
      .subscribe( response => this.listaTipoSolicitudRequerimiento = response);
  }

  SeleccionarArchivo(event) {
    this.textoDeInput = event.target.files[0].name;
  }
  AgregarRequisitos(codigoSolicitud: string) {
    this.requisitos = new RequisitosRequest();
    this.requisitos.CodigoTipoSolicitud = codigoSolicitud;
    this.requisitos.NombreSolicitud =  '';
    this.requisitos.UsuarioConsulta = 'ntrucios';
    this.requisitos.TerminalConsulta = 'CYRREC04';
    this.requisitos.CodigoSolicitud = codigoSolicitud;
    this.requisitos.Ubicacion = this.textoDeInput;
    this.requisitosSolicitud.push(this.requisitos);
  }

  AgregarGarantia() {
    if (this.objetoGarantia.cCodGarCli === undefined) {
      return;
    }

    if (this.garantias.filter(e => e.Codigo == this.objetoGarantia.cCodGarCli).length > 0) {
      return;
    }
    this.garantia = new GarantiaRequest();
    this.garantia.Codigo = this.objetoGarantia.cCodGarCli;
    this.garantia.Tipo = this.objetoGarantia.cCodTipGar;
    this.garantias.push(this.garantia);
  }
  QuitarGarantia(garantia: GarantiaRequest) {
    const index = this.garantias.indexOf(garantia, 0);
    if (index > -1) {
      this.garantias.splice(index, 1);
    }
  }
  ConstruyeGrabar() {
    this.atencionSolicitud.CodigoCliente = this.clienteData.CodigoCliente;
    this.atencionSolicitud.CodigoAsesor = 'ntrucios';
    this.atencionSolicitud.CodigoSolicitudCredito = this.recibeCodigo ;
    this.atencionSolicitud.CodigoTiposolicitud = this.opcionSolicitud.toString();
    this.atencionSolicitud.EstadoSolicitud = 1 ;
    this.atencionSolicitud.SituacionSolicitud = 2 ;
    this.atencionSolicitud.UsuarioRegistra = 'ntrucios';
    this.atencionSolicitud.TerminalRegistra = 'CYRREC04' ;
    this.atencionSolicitud.Garantias = this.garantias;
    this.atencionSolicitud.Requisitos =  this.requisitosSolicitud;
    console.log(this.atencionSolicitud);
    this.atencionSolicitudService.Grabar(this.atencionSolicitud).subscribe(
      response => {
        this.router.navigate(['/dashboard/listarsolicitud']),
          alertifyjs.success('Se registro la solicitud de Atencion.!!');
      }
    );
  }
  LimpiaArray() {
    this.requisitosSolicitud = [];
    this.garantias = [];
  }
  LineaCredito(codigoCliente: string, codigoOficina: string) {
    this.garantiaService.LineaCredito(codigoCliente, codigoOficina).subscribe(
      response => this.garantiaLineaCredito = response
    );
  }
  DatoGarantia(codigoCliente: string, codigoOficina: string) {
    this.garantiaService.DatosGarantia(codigoCliente, codigoOficina).subscribe(
      response => this.datoGarantiaResponse = response
    );

  }

  DatosGarantiaModal(template: TemplateRef<any>) {
    this.DatoGarantia(this.clienteData.CodigoCliente, '002');
    this.abrirModal(template);
  }

  LineaCreditoGarantiaModal(template: TemplateRef<any>) {
    this.LineaCredito(this.clienteData.CodigoCliente, '002');
    this.abrirModal(template);
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
  }
}
