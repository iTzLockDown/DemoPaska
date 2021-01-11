import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AgregarProcesoRequest} from '../Models/Request/AgregarProcesoRequest';
import {_ProcesoSolicitudApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class ProcesoSolicitudService {

  constructor(private http: HttpClient) {
  }


  ListarCodigo(codigoSolicitud: string): Observable<any> {
    return this.http.get<any>(`${_ProcesoSolicitudApi.ListarCodigo}${codigoSolicitud}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Listar(): Observable<any> {
    return this.http.get<any>(`${_ProcesoSolicitudApi.Listar}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  AgregarProceso(agregarProcesoRequest: AgregarProcesoRequest): Observable<any>{
    return this.http.post(`${_ProcesoSolicitudApi.AgregarProceso}`,agregarProcesoRequest)
      .pipe(
        catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }

}
