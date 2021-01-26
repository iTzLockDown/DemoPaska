export class RoutesAPI {
  public static API_ENDPOINT = 'http://200.60.61.250:8007/api';
}

export class _AsesorApi {

  public static Prefijo = RoutesAPI.API_ENDPOINT+'/asesor/';
  public static ListaColaUnica = _AsesorApi.Prefijo+'listarcolaunica';
  public static ListaColaMultiple = _AsesorApi.Prefijo+'listarcolamultiple';
  public static AsignaColaMultiple = _AsesorApi.Prefijo+'asignacolamultiple';
  public static AsignaColaUnica = _AsesorApi.Prefijo +'eliminacolamultiple?codigoAsesor=';
  public static OficinaAsesor = _AsesorApi.Prefijo +'listaroficinaasesormultiple?codigoAsesor=';
}

export class _AtencionSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/solicitudcredito/';
  public static Lista = _AtencionSolicitudApi.Prefijo+'lista?codigoAsesor='
  public static ListaTipo = _AtencionSolicitudApi.Prefijo+'listasituacion?codigoAsesor='
  public static ListaDevuelto = _AtencionSolicitudApi.Prefijo+'listadevolucion?codigoAsesor='
  public static ListaAsesorSolicitud = _AtencionSolicitudApi.Prefijo+'listaasesortipo?codigoAsesor='
  public static TraerUno = _AtencionSolicitudApi.Prefijo+'traeruno?codigoSolicitud=';
  public static Grabar = _AtencionSolicitudApi.Prefijo+'grabar';
}

export class _BuscarClienteApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/busquedacliente/';
  public static BuscaCliente = _BuscarClienteApi.Prefijo+'listarbusqueda';
  public static BuscaCredito = _BuscarClienteApi.Prefijo+'listarbusquedacredito?codigoCliente=';
}

export class  _ClasificacionContratoApi {
  public static Prefijo = RoutesAPI.API_ENDPOINT + '/clasificacioncontrato/';
  public static Listar = _ClasificacionContratoApi.Prefijo + 'lista';
  public static Buscar = _ClasificacionContratoApi.Prefijo+'buscar?variableBusqueda=';
  public static Grabar = _ClasificacionContratoApi.Prefijo+'grabar';
  public static Actualizar = _ClasificacionContratoApi.Prefijo+'actualizar';
  public static Eliminar = _ClasificacionContratoApi.Prefijo+'eliminar';
}

export class _ContratoApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/modelocontrato/';
  public static Listar = _ContratoApi.Prefijo+'lista';
  public static Buscar = _ContratoApi.Prefijo+'buscar?variableBusqueda=';
  public static Grabar = _ContratoApi.Prefijo+'grabar';
  public static Actualizar = _ContratoApi.Prefijo+'actualizar';
  public static Eliminar = _ContratoApi.Prefijo+'eliminar';
}
export class _EstadoProcesoSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/estadoprocesosolicitud/';
  public static Iniciar = _EstadoProcesoSolicitudApi.Prefijo+'iniciar';
  public static Finalizar = _EstadoProcesoSolicitudApi.Prefijo+'finalizar';
  public static Listar = _EstadoProcesoSolicitudApi.Prefijo+'listar?codigosolicitud=';
}
export class _EstadoSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/estadosolicitud/';
  public static Listar = _EstadoSolicitudApi.Prefijo+'listar';
  public static Grabar = _EstadoSolicitudApi.Prefijo+'grabar';
  public static Actualizar = _EstadoSolicitudApi.Prefijo+'actualizar';
  public static Eliminar = _EstadoSolicitudApi.Prefijo+'eliminar';

}
export class _OficinaApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/oficinacola/';
  public static OficinaColaUnica = _OficinaApi.Prefijo+'colaunica';
  public static AsignaOficinaAsesor = _OficinaApi.Prefijo+'asignacolamultiple';
  public static EliminaOficinaAsesor = _OficinaApi.Prefijo+'eliminacolamultiple?codigoOficina=';
}

export class _ProcesoSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/procesosolicitud/';
  public static ListarCodigo = _ProcesoSolicitudApi.Prefijo+'traercodigo?CodigoTipoSolicitud=';
  public static Listar = _ProcesoSolicitudApi.Prefijo+'listar';
  public static AgregarProceso = _ProcesoSolicitudApi.Prefijo+'agregarproceso';
  public static EliminarProceso = _ProcesoSolicitudApi.Prefijo+'eliminarproceso';
}
export class _SituacionSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/situacionsolicitud/';
  public static Listar = _SituacionSolicitudApi.Prefijo+'listar';
  public static Grabar = _SituacionSolicitudApi.Prefijo+'grabar';
  public static Actualizar = _SituacionSolicitudApi.Prefijo+'actualizar';
  public static Eliminar = _SituacionSolicitudApi.Prefijo+'eliminar?codigoTipoRequerimiento=';
}
export class _TipoRequisitoApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/tiporequerimiento/';
  public static Listar = _TipoRequisitoApi.Prefijo+'listar';
  public static Grabar = _TipoRequisitoApi.Prefijo+'grabar';
  public static Eliminar = _TipoRequisitoApi.Prefijo+'eliminar?codigoTipoRequerimiento=';
}
export class _TipoSolicitudApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/tiposolicitud/';
  public static Listar = _TipoSolicitudApi.Prefijo+'listar';
  public static Grabar = _TipoSolicitudApi.Prefijo+'grabar';
  public static Actualizar = _TipoSolicitudApi.Prefijo+'actualizar';
  public static Eliminar = _TipoSolicitudApi.Prefijo+'eliminar?codigoTipoSolicitud=';
}
export class _SolicitudRequisotoApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/tiposolicitudrequisito/';
  public static Listar = _SolicitudRequisotoApi.Prefijo+'listar?codigoTipoSolicitud=';
}
export class _GarantiaApi{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/tiposolicitud/';
  public static LineaCreditoGarantia = _GarantiaApi.Prefijo+'/lineacreditogarantia?codigoCliente=';
  public static DatoGarantia = _GarantiaApi.Prefijo+'/datosgarantia?codigoCliente=';
  public static SolicitudGarantia = _GarantiaApi.Prefijo+'/listacodigogarantia?codigoCliente=';
  public static SolicitudRequisito = _GarantiaApi.Prefijo+'/listacodigorequisito?codigoCliente=';

}

export class _Login{
  public static Prefijo = RoutesAPI.API_ENDPOINT+'/seguridad/';
  public static Token = _Login.Prefijo+'token';
}
