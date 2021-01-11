import {TipoRequisitoResponse} from '../Response/TipoRequisitoResponse';

export class TipoSolicitudRequest
{
  CodigoTipoSolicitud : number;
  NombreSolicitud : string;
  DescripcionSolicitud : string;
  UsuarioConsulta : string;
  TerminalConsulta : string;
  Requisitos: TipoRequisitoResponse[];
  constructor() {
    this.CodigoTipoSolicitud = 0;
    this.NombreSolicitud = '';
    this.DescripcionSolicitud = '';
    this.UsuarioConsulta = '';
    this.TerminalConsulta = '';
    this.Requisitos = [];
  }
}
