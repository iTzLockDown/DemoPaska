import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModeloContratoResponse} from '../../Models/Response/ModeloContratoResponse';
import {Router} from '@angular/router';
import {ContratoService} from '../../Services/contrato.service';

@Component({
  selector: 'app-plantilla-contrato',
  templateUrl: './plantilla-contrato.component.html'
})
export class PlantillaContratoComponent implements OnInit {
  modeloContrato : ModeloContratoResponse[];
  constructor(
              private router: Router,
              private contratoService: ContratoService) { }

  ngOnInit(): void {
    this.contratoService.Listar().subscribe(
      response => this.modeloContrato = response
    );
  }


}
