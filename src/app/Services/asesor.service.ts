import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AsesorResponse} from '../Models/Response/AsesorResponse';
import {catchError} from 'rxjs/operators';
import {OficinaResponse} from '../Models/Response/OficinaResponse';
import {AsesorRequest} from '../Models/Request/AsesorRequest';
import {_AsesorApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  constructor(private http: HttpClient) { }

  AsesoresColaUnica(): Observable<AsesorResponse[]> {
    // return this.http.get<AsesorResponse[]>(`${_AsesorApi.ListaColaUnica}`).pipe(
    //   catchError(e => {
    //     if (e.status === 400) {return throwError(e); }
    //   })
    // );
    return this.http.get<AsesorResponse[]>(`${_AsesorApi.ListaColaUnica}`);
  }

  AsesoresColaMultiple(): Observable<AsesorResponse[]> {

    return this.http.get<AsesorResponse[]>(`${_AsesorApi.ListaColaMultiple}`).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }

  AsignaAsesoresColaMultiple(asesorRequest: AsesorRequest): Observable<any> {
    return this.http.post<any>(`${_AsesorApi.AsignaColaMultiple}`, asesorRequest).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
      })
    );
  }

  AsignaAsesoresColaUnica(codigoAsesor: string): Observable<any> {
    return this.http.delete<any>(`${_AsesorApi.AsignaColaUnica}${codigoAsesor}`).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
      })
    );
  }

  OficinaAsesor(codigoAsesor: string): Observable<OficinaResponse[]> {
    return this.http.get<OficinaResponse[]>(`${ _AsesorApi.OficinaAsesor}${codigoAsesor}`);
  }
}
