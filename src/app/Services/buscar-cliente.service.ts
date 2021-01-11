import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {CriterioBusquedaRequest} from '../Models/Request/CriterioBusquedaRequest';
import {ClienteResponse} from '../Models/Response/ClienteResponse';
import {CreditoClienteResponse} from '../Models/Response/CreditoClienteResponse';
import {_BuscarClienteApi} from '../Util/RoutesAPI';
@Injectable({
  providedIn: 'root'
})
export class BuscarClienteService {

  constructor(private http: HttpClient) { }

  BuscarCliente(criterioBusqueda: CriterioBusquedaRequest): Observable<ClienteResponse[]>{

    return this.http.post<ClienteResponse[]>(`${_BuscarClienteApi.BuscaCliente}`,criterioBusqueda).pipe(
      catchError(e => {
        if(e.status ==400)return throwError(e);
      })
    );
  }
  BuscaCredito(codigoCliente: string): Observable<CreditoClienteResponse[]>
  {
      return this.http.get<CreditoClienteResponse[]>(`${_BuscarClienteApi.BuscaCredito}${codigoCliente}`).pipe(
        catchError(e => {
          if (e.status ==400) return throwError(e);
        })
      );
  }
}
