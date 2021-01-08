import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClasificacionContratoService} from '../../Services/clasificacion-contrato.service';
import {ClasificacionContratoResponse} from '../../Models/Response/ClasificacionContratoResponse';
import {resolveFileWithPostfixes} from '@angular/compiler-cli/ngcc/src/utils';

@Component({
  selector: 'app-clasificacion-contrato',
  templateUrl: './clasificacion-contrato.component.html',
})
export class ClasificacionContratoComponent implements OnInit {

  clasificacionContrato : ClasificacionContratoResponse[];
  constructor(private router: Router,
              private clasificacionContratoService: ClasificacionContratoService) { }

  ngOnInit(): void {
    this.clasificacionContratoService.Lista().subscribe(
      response => this.clasificacionContrato = response
    );
  }


}
