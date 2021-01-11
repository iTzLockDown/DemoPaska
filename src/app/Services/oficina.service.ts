import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {OficinaResponse} from '../Models/Response/OficinaResponse';
import {catchError} from 'rxjs/operators';
import {AsesorRequest} from '../Models/Request/AsesorRequest';
import {_OficinaApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class OficinaService {
  constructor(private http: HttpClient) { }

  OficinaColaUnica(): Observable<OficinaResponse[]> {
    return this.http.get<OficinaResponse[]>(`${_OficinaApi.OficinaColaUnica}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  AsignaOficinaAsesor(asesorRequest: AsesorRequest): Observable<any> {

    return this.http.post<any>(`${_OficinaApi.AsignaOficinaAsesor}`, asesorRequest)
      .pipe(
        catchError(e => {
        if (e.status == 400)return throwError(e);
      })
    );
  }

  EliminaOficinaAsesor(codigoOficina: string): Observable<any> {

    return this.http.get<any>(`${_OficinaApi.EliminaOficinaAsesor}${codigoOficina}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }
}
