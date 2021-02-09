import {NgModule} from '@angular/core';
import {DashboardRouting} from './dashboard.routing';
import {CommonModule} from '@angular/common';
import {TipoSolicitudComponent} from './tipo-solicitud/tipo-solicitud.component';
import {EstadoSolicitudComponent} from './estado-solicitud/estado-solicitud.component';
import {ClasificacionContratoComponent} from './clasificacion-contrato/clasificacion-contrato.component';
import {ContratoComponent} from './contrato/contrato.component';
import {TipoRequerimientoComponent} from './tipo-requerimiento/tipo-requerimiento.component';
import {SituacionSolicitudComponent} from './situacion-solicitud/situacion-solicitud.component';
import {GestionAtencionAsesorComponent} from './gestion-atencion-asesor/gestion-atencion-asesor.component';
import {AsesorService} from '../Services/asesor.service';
import {AsignaOficinaComponent} from './gestion-atencion-asesor/asigna-oficina/asigna-oficina.component';
import {ClasificacionContratoService} from '../Services/clasificacion-contrato.service';
import {ContratoService} from '../Services/contrato.service';
import {OficinaService} from '../Services/oficina.service';
import { FormClasificacionContratoComponent } from './clasificacion-contrato/form-clasificacion-contrato/form-clasificacion-contrato.component';
import { FormModeloContratoComponent } from './contrato/form-modelo-contrato/form-modelo-contrato.component';
import {FormsModule} from '@angular/forms';
import {RegistraSolicitudComponent} from './Solicitud/registra-solicitud/registra-solicitud.component';
import {AtencionSolicitudComponent} from './Solicitud/atencion-solicitud/atencion-solicitud.component';
import {BuscarClienteComponent} from './Solicitud/registra-solicitud/buscar-cliente/buscar-cliente.component';
import {CreditoClienteComponent} from './Solicitud/registra-solicitud/credito-cliente/credito-cliente.component';
import {EstadoProcesoSolicitudComponent} from './Solicitud/atencion-solicitud/estado-proceso-solicitud/estado-proceso-solicitud.component';
import {SolicitudProcesoComponent} from './tipo-solicitud/solicitud-proceso/solicitud-proceso.component';
import {GestionSolicitudComponent} from './Solicitud/GestionSolicitud/gestion-solicitud/gestion-solicitud.component';
import {AnuladoSolicitudComponent} from "./Solicitud/GestionSolicitud/anulado-solicitud/anulado-solicitud.component";
import {EnviadoSolicitudComponent} from "./Solicitud/GestionSolicitud/enviado-solicitud/enviado-solicitud.component";
import {AtendidoSolicitudComponent} from "./Solicitud/GestionSolicitud/atendido-solicitud/atendido-solicitud.component";
import {QuillModule} from 'ngx-quill';
@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    QuillModule.forRoot(),
    FormsModule
  ],
  declarations: [
    TipoSolicitudComponent,
    EstadoSolicitudComponent,
    ClasificacionContratoComponent,
    ContratoComponent,
    TipoRequerimientoComponent,
    SituacionSolicitudComponent,
    GestionAtencionAsesorComponent,
    AsignaOficinaComponent,
    FormClasificacionContratoComponent,
    FormModeloContratoComponent,
    RegistraSolicitudComponent,
    BuscarClienteComponent,
    CreditoClienteComponent,
    EstadoProcesoSolicitudComponent,
    SolicitudProcesoComponent,
    GestionSolicitudComponent,
    AtencionSolicitudComponent,
    AnuladoSolicitudComponent,
    EnviadoSolicitudComponent,
    AtendidoSolicitudComponent

  ],
  providers: [
    AsesorService,
    ClasificacionContratoService,
    ContratoService,
    OficinaService,
    RegistraSolicitudComponent,
  ],

})
export class DashboardModule { }
