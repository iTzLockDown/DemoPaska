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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppDefaultLayoutComponent} from './Views/Common/app-default-layout/app-default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DashboardComponent} from './Views/Common/dashboard/dashboard.component';
import {TokenInterceptor} from './Interceptor/TokenInterceptor';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PlantillaContratoComponent } from './Views/plantilla-contrato/plantilla-contrato.component';
import {GenerarContratoComponent} from './Views/generar-contrato/generar-contrato.component';
import { DiseniadorContratoComponent } from './Views/diseniador-contrato/diseniador-contrato.component';
import { GeneradorContratoComponent } from './Views/generador-contrato/generador-contrato.component';
PdfMakeWrapper.setFonts(pdfFonts);
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
    DashboardComponent,
    PlantillaContratoComponent,
    GenerarContratoComponent,
    DiseniadorContratoComponent,
    GeneradorContratoComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-PE'},
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
