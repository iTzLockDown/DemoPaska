import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TipoRequisitoResponse} from '../Models/Response/TipoRequisitoResponse';
import {_TipoRequisitoApi} from '../Util/RoutesAPI';
import {TipoRequerimientoRequest} from '../Models/Request/TipoRequerimientoRequest';
@Injectable({
  providedIn: 'root'
})
export class TipoRequisitoService {

  constructor(private http: HttpClient) { }


  Listar(): Observable<TipoRequisitoResponse[]>{
    return this.http.get<TipoRequisitoResponse[]>( `${_TipoRequisitoApi.Listar}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Grabar(tipoRequerimiento: TipoRequerimientoRequest): Observable<any>{
    return this.http.post<any>( `${_TipoRequisitoApi.Grabar}`,tipoRequerimiento ).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
  Eliminar(codigoTipoRequerimiento: number): Observable<any>{
    let params = new URLSearchParams();
    return this.http.post<any>( `${_TipoRequisitoApi.Eliminar}${codigoTipoRequerimiento}`,params).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
}
