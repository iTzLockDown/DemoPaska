import {NgModule} from '@angular/core';
import {DashboardRouting, routes} from './dashboard.routing';
import {CommonModule} from '@angular/common';
import {AppUsuarioComponent} from './app-usuario/app-usuario.component';
import {FormUsuarioComponent} from './app-usuario/form-usuario/form-usuario.component';
import {UsuarioService} from '../Services/usuario.service';
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
@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    FormsModule
  ],
  declarations: [
    AppUsuarioComponent,
    FormUsuarioComponent,
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
    AtencionSolicitudComponent,
    CreditoClienteComponent,
    EstadoProcesoSolicitudComponent,
  ],
  providers: [
    UsuarioService,
    AsesorService,
    ClasificacionContratoService,
    ContratoService,
    OficinaService,
    RegistraSolicitudComponent
  ],

})
export class DashboardModule { }
