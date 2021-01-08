import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './Views/Common/app-header/app-header.component';
import { AppAssideComponent } from './Views/Common/app-asside/app-asside.component';
import { AppFooterComponent } from './Views/Common/app-footer/app-footer.component';
import { AppSidebarComponent } from './Views/Common/app-sidebar/app-sidebar.component';
import { AppLoginComponent } from './Views/app-login/app-login.component';
import { AppError500Component } from './Views/Common/error/app-error500/app-error500.component';
import { AppError404Component } from './Views/Common/error/app-error404/app-error404.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppDefaultLayoutComponent} from './Views/Common/app-default-layout/app-default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionSolicitudComponent } from './Views/Solicitud/gestion-solicitud/gestion-solicitud.component';
import { FormularioTipoSolicitudComponent } from './Views/tipo-solicitud/formulario-tipo-solicitud/formulario-tipo-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppAssideComponent,
    AppFooterComponent,
    AppSidebarComponent,
    AppLoginComponent,
    AppError500Component,
    AppError404Component,
    AppDefaultLayoutComponent,
    GestionSolicitudComponent,
    FormularioTipoSolicitudComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [

    {provide: LOCALE_ID, useValue: 'es-PE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
