import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppDefaultLayoutComponent} from './Common/app-default-layout/app-default-layout.component';
import {EstadoSolicitudComponent} from './estado-solicitud/estado-solicitud.component';
import {SituacionSolicitudComponent} from './situacion-solicitud/situacion-solicitud.component';
import {TipoRequerimientoComponent} from './tipo-requerimiento/tipo-requerimiento.component';
import {TipoSolicitudComponent} from './tipo-solicitud/tipo-solicitud.component';
import {ClasificacionContratoComponent} from './clasificacion-contrato/clasificacion-contrato.component';
import {ContratoComponent} from './contrato/contrato.component';
import {GestionAtencionAsesorComponent} from './gestion-atencion-asesor/gestion-atencion-asesor.component';
import {AsignaOficinaComponent} from './gestion-atencion-asesor/asigna-oficina/asigna-oficina.component';
import {FormClasificacionContratoComponent} from './clasificacion-contrato/form-clasificacion-contrato/form-clasificacion-contrato.component';
import {FormModeloContratoComponent} from './contrato/form-modelo-contrato/form-modelo-contrato.component';
import {AtencionSolicitudComponent} from './Solicitud/atencion-solicitud/atencion-solicitud.component';
import {RegistraSolicitudComponent} from './Solicitud/registra-solicitud/registra-solicitud.component';
import {GestionSolicitudComponent} from './Solicitud/GestionSolicitud/gestion-solicitud/gestion-solicitud.component';
import {SolicitudProcesoComponent} from './tipo-solicitud/solicitud-proceso/solicitud-proceso.component';
import {DashboardComponent} from './Common/dashboard/dashboard.component';
import {AutentificacionGuard} from '../Guards/autentificacion.guard';
import {PlantillaContratoComponent} from './plantilla-contrato/plantilla-contrato.component';
import {GenerarContratoComponent} from './generar-contrato/generar-contrato.component';
import {AnuladoSolicitudComponent} from "./Solicitud/GestionSolicitud/anulado-solicitud/anulado-solicitud.component";
import {AtendidoSolicitudComponent} from "./Solicitud/GestionSolicitud/atendido-solicitud/atendido-solicitud.component";
import {EnviadoSolicitudComponent} from "./Solicitud/GestionSolicitud/enviado-solicitud/enviado-solicitud.component";
import {DiseniadorContratoComponent} from "./diseniador-contrato/diseniador-contrato.component";
import {GeneradorContratoComponent} from "./generador-contrato/generador-contrato.component";
export const routes: Routes = [
  {
    path: '', component: AppDefaultLayoutComponent,
    canActivate:[AutentificacionGuard],
    children: [
      {
        path: 'estadosolicitud', component: EstadoSolicitudComponent
      },
      {
        path: 'situacionsolicitud', component: SituacionSolicitudComponent
      },
      {
        path: 'tiporequerimiento', component: TipoRequerimientoComponent
      },
      {
        path: 'tiposolicitud', component: TipoSolicitudComponent
      },
      {
        path: 'tiposolicitud/proceso/:id', component: SolicitudProcesoComponent
      },
      {
        path: 'clasificacioncontrato', component: ClasificacionContratoComponent
      },
      {
        path: 'clasificacioncontrato/create', component: FormClasificacionContratoComponent
      },
      {
        path: 'clasificacioncontrato/actualizar/:id', component: FormClasificacionContratoComponent
      },
      {
        path: 'contrato', component: ContratoComponent
      },
      {
        path: 'contrato/createcontrato', component: FormModeloContratoComponent
      },
      {
        path: 'contrato/actualizarcontrato/:id', component: FormModeloContratoComponent
      },
      {
        path: 'gestionarcola', component: GestionAtencionAsesorComponent
      },
      {
        path: 'gestionarcola/asignaoficina/:id/:nombreAsesor', component: AsignaOficinaComponent
      },
      /* SOLICITUD */
      {
        path: 'listarsolicitud', component: AtencionSolicitudComponent
      },
      {
        path: 'listarsolicitud/gestionsolicitud/:id', component: GestionSolicitudComponent
      },
      {
        path: 'registrarsolicitud', component: RegistraSolicitudComponent
      },
      {
        path: 'plantillascontrato', component: PlantillaContratoComponent
      },
      {
        path: 'plantillascontrato/generarcontrato', component: GenerarContratoComponent
      },
      /* ATENCION */
      {
        path: 'solicitudanulada', component: AnuladoSolicitudComponent
      },
      {
        path: 'solicitudatendida', component: AtendidoSolicitudComponent
      },
      {
        path: 'solicitudenviada', component: EnviadoSolicitudComponent
      },
      {
        path: 'diseniador', component: DiseniadorContratoComponent
      },
      {
        path: 'generador', component: GeneradorContratoComponent
      },
      { path: '**', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class DashboardRouting {}
