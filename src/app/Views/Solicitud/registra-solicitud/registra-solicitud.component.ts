import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ClienteResponse} from '../../../Models/Response/ClienteResponse';
import {BuscarClienteService} from '../../../Services/buscar-cliente.service';
import {CreditoClienteResponse} from '../../../Models/Response/CreditoClienteResponse';
import {TipoSolicitudService} from '../../../Services/tipo-solicitud.service';
import {TipoSolicitudRequest} from '../../../Models/Request/TipoSolicitudRequest';
import {TipoSolicitudRequisitoService} from '../../../Services/tipo-solicitud-requisito.service';
import {RequisitosRequest} from '../../../Models/Request/RequisitosRequest';
import {SituacionSolicitudService} from '../../../Services/situacion-solicitud.service';
import {EstadoSolicitudService} from '../../../Services/estado-solicitud.service';
import {EstadoResponse} from '../../../Models/Response/EstadoResponse';
import {SituacionResponse} from '../../../Models/Response/SituacionResponse';
import {AtencionSolicitudRequest} from '../../../Models/Request/AtencionSolicitudRequest';
import {AtencionSolicitudService} from '../../../Services/atencion-solicitud.service';
import {GarantiaRequest} from '../../../Models/Request/GarantiaRequest';
@Component({
  selector: 'app-registra-solicitud',
  templateUrl: './registra-solicitud.component.html'
})
export class RegistraSolicitudComponent implements OnInit {
  atencionSolicitud: AtencionSolicitudRequest = new AtencionSolicitudRequest();
  estadoModal:boolean= false;
  estadoModalCredito: boolean= false;
  clienteData :ClienteResponse = new ClienteResponse();
  creditoInformacion : CreditoClienteResponse[];
  textoDeInput: string = null
  codigoCliente : string;
  listaTipoSolicitud : TipoSolicitudRequest[];
  listaTipoSolicitudRequerimiento: TipoSolicitudRequest[];
  opcionSolicitud: any;
  requisitos: RequisitosRequest;
  requisitosSolicitud : RequisitosRequest[] = [];
  garantia : GarantiaRequest;
  garantias : GarantiaRequest[] = [];
  coditoTipoSolicitud :bigint;
  estadoSolicitud: EstadoResponse[];
  situacionSolicitud: SituacionResponse[];
  creditoData : CreditoClienteResponse = new CreditoClienteResponse();
  private archivoSeleccionado: File;
  recibeCodigo: string ='';
  constructor(private buscarCliente: BuscarClienteService,
              private tipoSolicitud: TipoSolicitudService,
              private tipoSolicitudRequerimineto: TipoSolicitudRequisitoService,
              private situacionSolicitudService: SituacionSolicitudService,
              private estadoSolicitudService: EstadoSolicitudService,
              private atencionSolicitudService: AtencionSolicitudService) { }

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

  AbrirBusquedaCliente(){
    this.estadoModal = true;
  }
  AbrirCreditoCliente(codigoCliente:string){
    this.estadoModalCredito = true;
    this.codigoCliente = codigoCliente;
  }
  CerrarBusquedaCliente($event)
  {
    this.estadoModal = $event;
    console.log(this.clienteData.CodigoCliente)
    this.CargarCredito(this.clienteData.CodigoCliente);

  }
  CerrarCreditoCliente($event)
  {
    this.estadoModalCredito = $event;
  }
  RecibirCodigoCredito($event){
    this.recibeCodigo = $event;
  }
  ClienteSeleccionado($event) {
    this.clienteData = $event;
  }
  CargarCredito(codigoCliente:string)
  {
    this.buscarCliente.BuscaCredito(codigoCliente)
      .subscribe( (response: CreditoClienteResponse[]) => {
          this.creditoData = response[0] as CreditoClienteResponse
        }
      );
  }

  TraerRequisitos(codigoTipoSolicitud: bigint)
  {
    this.coditoTipoSolicitud = codigoTipoSolicitud;
    this.tipoSolicitudRequerimineto.Listar(codigoTipoSolicitud)
      .subscribe( response => this.listaTipoSolicitudRequerimiento = response);
  }

  SeleccionarArchivo(event){
    this.textoDeInput = event.target.files[0].name;
  }
  AgregarRequisitos(codigoSolicitud: string){
    this.requisitos = new RequisitosRequest();
    this.requisitos.CodigoTipoSolicitud = this.coditoTipoSolicitud.toString();
    this.requisitos.NombreSolicitud =  '';
    this.requisitos.UsuarioConsulta = 'ntrucios';
    this.requisitos.TerminalConsulta = 'CYRREC04';
    this.requisitos.CodigoSolicitud = codigoSolicitud;
    this.requisitos.Ubicacion = this.textoDeInput;
    this.requisitosSolicitud.push(this.requisitos);
  }

  ConstruyeGrabar()
  {
    this.garantia = new GarantiaRequest();
    this.garantia.Codigo = "1";
    this.garantias.push(this.garantia);
    this.garantia = new GarantiaRequest();
    this.garantia.Codigo = "2";
    this.garantias.push(this.garantia);

    this.atencionSolicitud.CodigoCliente = this.clienteData.CodigoCliente;
    this.atencionSolicitud.CodigoAsesor = 'ntrucios';
    this.atencionSolicitud.CodigoSolicitudCredito = this.recibeCodigo ;
    this.atencionSolicitud.CodigoTiposolicitud = "56";
    this.atencionSolicitud.EstadoSolicitud = 1 ;
    this.atencionSolicitud.SituacionSolicitud = 2 ;
    this.atencionSolicitud.UsuarioRegistra = 'ntrucios';
    this.atencionSolicitud.TerminalRegistra = 'CYRREC04' ;
    this.atencionSolicitud.Garantias = this.garantias;
    this.atencionSolicitud.Requisitos =  this.requisitosSolicitud;

    this.atencionSolicitudService.Grabar(this.atencionSolicitud).subscribe(
      response => console.log(response)
    );

    console.log(this.atencionSolicitud)
  }
}
