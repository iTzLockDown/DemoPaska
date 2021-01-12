import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TipoSolicitudRequest} from '../Models/Request/TipoSolicitudRequest';
import {catchError} from 'rxjs/operators';
import {_TipoRequisitoApi, _TipoSolicitudApi} from '../Util/RoutesAPI';
import {TipoSolicitudResponse} from '../Models/Response/TipoSolicitudResponse';
@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudService {
  constructor(private http: HttpClient) { }

  Listar(): Observable<TipoSolicitudResponse[]>{
    return this.http.get<TipoSolicitudResponse[]>( `${_TipoSolicitudApi.Listar}` ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Grabar(tipoSolicitud: TipoSolicitudRequest): Observable<any>{
    return this.http.post<any>( `${_TipoSolicitudApi.Grabar}`, tipoSolicitud).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Actualizar(tipoSolicitud: TipoSolicitudRequest): Observable<any>{
    return this.http.put<any>( `${_TipoSolicitudApi.Actualizar}`, tipoSolicitud).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Eliminar(codigoTipoSolicitud: string): Observable<any>{
    return this.http.delete<any>( `${_TipoSolicitudApi.Eliminar}${codigoTipoSolicitud}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
}
