import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EstadoResponse} from '../Models/Response/EstadoResponse';
import {_EstadoSolicitudApi} from '../Util/RoutesAPI';
import {EstadoSolicitudRequest} from '../Models/Request/EstadoSolicitudRequest';
@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {
  constructor(private http: HttpClient) { }
  Listar(): Observable<EstadoResponse[]> {
    return this.http.get<EstadoResponse[]>( `${_EstadoSolicitudApi.Listar}`).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
  Grabar(estadoSolicitud: EstadoSolicitudRequest): Observable<any>  {
    return this.http.post<any>( `${_EstadoSolicitudApi.Grabar}`, estadoSolicitud).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
  Actualizar(estadoSolicitud: EstadoSolicitudRequest): Observable<any>  {
    return this.http.put<any>( `${_EstadoSolicitudApi.Actualizar}`, estadoSolicitud).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
  Eliminar(estadoSolicitud: EstadoSolicitudRequest): Observable<any> {
    return this.http.put<any>(`${_EstadoSolicitudApi.Eliminar}`, estadoSolicitud).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
}
