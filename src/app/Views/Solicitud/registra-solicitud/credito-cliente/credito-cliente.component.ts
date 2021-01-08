import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CreditoClienteResponse} from '../../../../Models/Response/CreditoClienteResponse';
import {BuscarClienteService} from '../../../../Services/buscar-cliente.service';

@Component({
  selector: 'app-credito-cliente',
  templateUrl: './credito-cliente.component.html'
})
export class CreditoClienteComponent implements OnInit {
  creditoData : CreditoClienteResponse = new CreditoClienteResponse();
  codigoCred:string;
  @Output() codigoCredito = new EventEmitter<string>();
  @Input() codigoCliente: string;
  @Output() estadoModalCreditoEvent = new EventEmitter<boolean>();
  estadoModalCredito: boolean= false;
  constructor(private buscarCliente: BuscarClienteService) { }

  ngOnInit(): void {
    this.BuscarCredito(this.codigoCliente);
  }
  BuscarCredito(codigoCliente: string)
  {
    this.buscarCliente.BuscaCredito(codigoCliente)
      .subscribe( (response: CreditoClienteResponse[]) => {
          this.creditoData = response[0] as CreditoClienteResponse
        }
      );
  }
  CerrarCredtio(){

    this.estadoModalCreditoEvent.emit(this.estadoModalCredito);
  }
  EnviarCodigoCredito(codigoCredito: string){
    this.codigoCredito.emit(codigoCredito);
  }

}
