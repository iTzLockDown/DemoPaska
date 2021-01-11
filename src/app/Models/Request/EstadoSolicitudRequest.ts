export class EstadoSolicitudRequest
{
  CodigoEstado : string;
  Descripcion : string;
  Usuario : string;
  Terminal : string;


  constructor() {
    this.CodigoEstado = '';
    this.Descripcion = '';
    this.Usuario = '';
    this.Terminal = '';
  }
}
