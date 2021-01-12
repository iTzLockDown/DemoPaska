import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SituacionResponse} from '../Models/Response/SituacionResponse';
import {_EstadoSolicitudApi, _SituacionSolicitudApi} from '../Util/RoutesAPI';
import {EstadoSolicitudRequest} from '../Models/Request/EstadoSolicitudRequest';
import {SituacionSolicitudRequest} from '../Models/Request/SituacionSolicitudRequest';
@Injectable({
  providedIn: 'root'
})
export class SituacionSolicitudService {

  constructor(private http: HttpClient) { }


  Listar(): Observable<SituacionResponse[]>{
    return this.http.get<SituacionResponse[]>( `${_SituacionSolicitudApi.Listar}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Grabar(situacionSolicitud: SituacionSolicitudRequest):Observable<any>  {
    return this.http.post<any>( `${_SituacionSolicitudApi.Grabar}`,situacionSolicitud ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Actualizar(situacionSolicitud: SituacionSolicitudRequest):Observable<any>  {
    return this.http.put<any>( `${_SituacionSolicitudApi.Actualizar}`,situacionSolicitud ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Eliminar(situacionSolicitud: SituacionSolicitudRequest):Observable<any>  {
    return this.http.put<any>( `${_SituacionSolicitudApi.Eliminar}`,situacionSolicitud ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
}
