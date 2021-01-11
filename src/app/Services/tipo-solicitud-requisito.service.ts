import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TipoSolicitudRequest} from '../Models/Request/TipoSolicitudRequest';
import {catchError} from 'rxjs/operators';
import {_SolicitudRequisotoApi} from '../Util/RoutesAPI';
import {SolicitudRequisitoResponse} from '../Models/Response/SolicitudRequisitoResponse';
@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudRequisitoService {

  constructor(private http: HttpClient) { }

  Listar(codigoTipoSolicitud:string): Observable<any>{
    return this.http.get<any>( `${_SolicitudRequisotoApi.Listar}${codigoTipoSolicitud}` ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
}
