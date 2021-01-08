import {GarantiaRequest} from './GarantiaRequest';
import {RequisitosRequest} from './RequisitosRequest';

export class AtencionSolicitudRequest{
  CodigoCliente : string;
  CodigoAsesor : string;
  CodigoSolicitudCredito : string;
  CodigoTiposolicitud : string;
  EstadoSolicitud : number;
  SituacionSolicitud : number;
  UsuarioRegistra : string;
  TerminalRegistra : string;
  Garantias: GarantiaRequest[];
  Requisitos: RequisitosRequest[];
}
