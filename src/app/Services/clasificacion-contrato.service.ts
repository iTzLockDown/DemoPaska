import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {ClasificacionContratoResponse} from '../Models/Response/ClasificacionContratoResponse';
import {ClasificacionContratoRequest} from '../Models/Request/ClasificacionContratoRequest';
import {_ClasificacionContratoApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class ClasificacionContratoService {

  constructor(private http: HttpClient) { }


  Listar(): Observable<ClasificacionContratoResponse[]> {

    return this.http.get<ClasificacionContratoResponse[]>(`${_ClasificacionContratoApi.Listar}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Buscar(nombreBusqueda: string): Observable<ClasificacionContratoResponse[]> {

    return this.http.get<ClasificacionContratoResponse[]>(`${_ClasificacionContratoApi.Buscar}${nombreBusqueda}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Grabar(oClasificacionContrato: ClasificacionContratoRequest): Observable<any>{
    return this.http.post<any>(`${_ClasificacionContratoApi.Grabar}`, oClasificacionContrato)
      .pipe(      catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }
  Actualizar(oClasificacionContrato: ClasificacionContratoRequest): Observable<any>{
    return this.http.put<any>(`${_ClasificacionContratoApi.Actualizar}`, oClasificacionContrato)
      .pipe(      catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }
}
