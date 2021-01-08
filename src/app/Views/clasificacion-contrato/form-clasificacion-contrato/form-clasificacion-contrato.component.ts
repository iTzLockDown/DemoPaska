import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ClasificacionContratoRequest} from '../../../Models/Request/ClasificacionContratoRequest';
import {ClasificacionContratoService} from '../../../Services/clasificacion-contrato.service';
import alertifyjs from 'AlertifyJS';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form-clasificacion-contrato',
  templateUrl: './form-clasificacion-contrato.component.html',
})
export class FormClasificacionContratoComponent implements OnInit {
  public clasificacionContratoRequest: ClasificacionContratoRequest = new ClasificacionContratoRequest();

  constructor(private _location: Location,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private clasificacionContratoService : ClasificacionContratoService) { }

  ngOnInit(): void {
  }

  CargarClasificacionContrato():void{

      this.activatedRoute.params.subscribe(
        params => {
          let id = params['id']
          if (id) {
            // this.deporteService.getDeporte(id).subscribe(
            //   (deportes) => this.deportes = deportes);
          }
        });

  }


  backClicked() {
    this._location.back();
  }

  Grabar():void{

    this.clasificacionContratoRequest.Usuario = 'ntrucios';
    this.clasificacionContratoRequest.Terminal= 'CYRREC04';
      this.clasificacionContratoService.Grabar(this.clasificacionContratoRequest).subscribe(
        response =>{
          alertifyjs.success('Creado Correctamente'),
            this.backClicked();
        },
      );
  }

  Actualizar():void{
    console.log();
    // this.clasificacionContrato.Usuario = 'ntrucios';
    // this.clasificacionContrato.Terminal= 'CYRREC04';
    // this.clasificacionContratoService.Grabar(this.clasificacionContrato).subscribe(
    //   response =>{
    //     alertifyjs.success('Creado Correctamente'),
    //       this.backClicked();
    //   },
    // );
  }

}
