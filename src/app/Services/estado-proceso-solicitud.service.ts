import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {AccionSolicitud} from '../Models/Request/AccionSolicitud';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AtencionSolicitudResponse} from '../Models/Response/AtencionSolicitudResponse';
import alertifyjs from 'AlertifyJS';
import {AccionSolicitudResponse} from '../Models/Response/AccionSolicitudResponse';
import {_EstadoProcesoSolicitudApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class EstadoProcesoSolicitudService {

  constructor(private http: HttpClient) { }

  Iniciar(accionSolicitud: AccionSolicitud):Observable<any>{
    return this.http.post<any>(`${_EstadoProcesoSolicitudApi.Iniciar}`, accionSolicitud)
      .pipe(      catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }

  Finalizar(accionSolicitud :AccionSolicitud):Observable<any>{
    return this.http.post<any>(`${_EstadoProcesoSolicitudApi.Finalizar}`, accionSolicitud).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Listar(codigoSolicitud: string): Observable<AccionSolicitudResponse[]> {
    return this.http.get<AccionSolicitudResponse[]>(`${_EstadoProcesoSolicitudApi.Listar}${codigoSolicitud}`).pipe(
      catchError(e => {
        if (e.status == 400) return throwError(e);
      })
    );
  }
}
