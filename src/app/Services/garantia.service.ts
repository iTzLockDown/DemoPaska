import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {EstadoResponse} from '../Models/Response/EstadoResponse';
import {_EstadoSolicitudApi, _GarantiaApi} from '../Util/RoutesAPI';
import {catchError} from 'rxjs/operators';
import {GarantiaLineaCredito} from '../Models/Response/GarantiaLineaCredito';
import {DatoGarantiaResponse} from '../Models/Response/DatoGarantiaResponse';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {

  constructor(private http: HttpClient) { }
  DatosGarantia(codigoCliente: string, codigoOficina : string): Observable<any[]> {
    return this.http.get<any[]>( `${_GarantiaApi.DatoGarantia}${codigoCliente}&codigoOficina=${codigoOficina}`).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
  LineaCredito(codigoCliente: string, codigoOficina : string): Observable<GarantiaLineaCredito[]> {
    return this.http.get<GarantiaLineaCredito[]>( `${_GarantiaApi.LineaCreditoGarantia}${codigoCliente}&codigoOficina=${codigoOficina}`).pipe(
      catchError(e => {
        if (e.status === 400) {return throwError(e); }
      })
    );
  }
}
