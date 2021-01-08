import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CriterioBusquedaRequest} from '../../../../Models/Request/CriterioBusquedaRequest';
import {BuscarClienteService} from '../../../../Services/buscar-cliente.service';
import {ClienteResponse} from '../../../../Models/Response/ClienteResponse';
import {CreditoClienteResponse} from '../../../../Models/Response/CreditoClienteResponse';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
})
export class BuscarClienteComponent implements OnInit {
  clienteRespose : ClienteResponse[];

  public criterioBusqueda: CriterioBusquedaRequest = new CriterioBusquedaRequest();

  estadoModal:boolean= false;
  creditoDatosCliente : CreditoClienteResponse;
  @Output() estadoModalEvent = new EventEmitter<boolean>();
  @Output() clienteSeleccionadoEvent = new EventEmitter<ClienteResponse>();

  constructor(private buscarCliente: BuscarClienteService) { }

  ngOnInit(): void {
  }
  BuscarCliente()
  {
    this.buscarCliente.BuscarCliente(this.criterioBusqueda).subscribe(
      response => this.clienteRespose = response
    );
  }


  SeleccionarCliente(seleccionado: ClienteResponse){
    this.clienteSeleccionadoEvent.emit(seleccionado);
    this.CerrarBusqueda();
  }
  CerrarBusqueda(){
    this.estadoModalEvent.emit(this.estadoModal);
  }
}
