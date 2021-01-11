import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ModeloContratoResponse} from '../Models/Response/ModeloContratoResponse';
import {ModeloContratoRequest} from '../Models/Request/ModeloContratoRequest';
import {_ContratoApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }
  Listar(): Observable<ModeloContratoResponse[]> {

    return this.http.get<ModeloContratoResponse[]>(`${_ContratoApi.Listar}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Buscar(nombreBusqueda: string): Observable<ModeloContratoResponse[]> {

    return this.http.get<ModeloContratoResponse[]>(`${_ContratoApi.Buscar}${nombreBusqueda}`).pipe(
      catchError(e => {
        if (e.status ==400) return throwError(e);
      })
    );
  }

  Grabar(oModeloContrato: ModeloContratoRequest): Observable<any>{
    return this.http.post<any>(`${_ContratoApi.Grabar}`, oModeloContrato)
      .pipe(      catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }
  Actualizar(oModeloContrato: ModeloContratoRequest): Observable<any>{
    return this.http.put<any>(`${_ContratoApi.Actualizar}`, oModeloContrato)
      .pipe(      catchError(e => {
          if (e.status == 400)return throwError(e);
        })
      );
  }
}
