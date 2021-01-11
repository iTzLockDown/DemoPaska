import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AtencionSolicitudResponse} from '../Models/Response/AtencionSolicitudResponse';
import {AtencionSolicitudRequest} from '../Models/Request/AtencionSolicitudRequest';
import {_AtencionSolicitudApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class AtencionSolicitudService {

  constructor(private http: HttpClient) { }

  Lista(codigoAsesor:string): Observable<AtencionSolicitudResponse[]> {

    return this.http.get<AtencionSolicitudResponse[]>(`${_AtencionSolicitudApi.Lista}${codigoAsesor}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  TraerUno(codigoSolicitud:string): Observable<AtencionSolicitudResponse>{
    return this.http.get<AtencionSolicitudResponse>(`${_AtencionSolicitudApi.TraerUno}${codigoSolicitud}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Grabar(atencionSolicitud: AtencionSolicitudRequest): Observable<any>{
    return this.http.post<any>(`${_AtencionSolicitudApi.Grabar}`, atencionSolicitud).pipe(
      catchError(e=>{
        if (e.status==400){
          return throwError(e);
        }
      })
    );
  }

}
