import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModeloContratoResponse} from '../../Models/Response/ModeloContratoResponse';
import {ContratoService} from '../../Services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html'
})
export class ContratoComponent implements OnInit {

  modeloContrato : ModeloContratoResponse[];
  constructor(private router: Router,
              private contratoService: ContratoService) { }

  ngOnInit(): void {
    this.contratoService.Listar().subscribe(
      response => this.modeloContrato = response
    );
  }

}
