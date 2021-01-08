import { Component, OnInit } from '@angular/core';
import {ModeloContratoRequest} from '../../../Models/Request/ModeloContratoRequest';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ContratoService} from '../../../Services/contrato.service';
import {ClasificacionContratoService} from '../../../Services/clasificacion-contrato.service';
import {ClasificacionContratoResponse} from '../../../Models/Response/ClasificacionContratoResponse';
import alertifyjs from 'AlertifyJS';
import {EstadoProcesoSolicitudService} from '../../../Services/estado-proceso-solicitud.service';
import {AccionSolicitudResponse} from '../../../Models/Response/AccionSolicitudResponse';
@Component({
  selector: 'app-form-modelo-contrato',
  templateUrl: './form-modelo-contrato.component.html'
})
export class FormModeloContratoComponent implements OnInit {
  public contratoPlantilla: ModeloContratoRequest =new ModeloContratoRequest();
  clasificacionContrato : ClasificacionContratoResponse[];

  constructor(private _location: Location,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private contratoService: ContratoService,
              private clasificacionContratoService: ClasificacionContratoService) { }

  ngOnInit(): void {
    this.clasificacionContratoService.Lista().subscribe(
      response => this.clasificacionContrato = response
    );

  }

  backClicked() {
    this._location.back();
  }

  Grabar(): void
  {
    this.contratoPlantilla.Usuario = 'ntrucios';
    this.contratoPlantilla.Terminal= 'CYRREC04';
    this.contratoService.Grabar(this.contratoPlantilla).subscribe(
      response =>{
        alertifyjs.success('Creado Correctamente'),
          this.backClicked();
      },
    );
  }
  Actualizar(): void
  {

  }
}
