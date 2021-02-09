import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ClasificacionContratoRequest} from '../../../Models/Request/ClasificacionContratoRequest';
import {ClasificacionContratoService} from '../../../Services/clasificacion-contrato.service';
import alertifyjs from 'AlertifyJS';
import {ActivatedRoute, Router} from '@angular/router';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-form-clasificacion-contrato',
  templateUrl: './form-clasificacion-contrato.component.html',
})
export class FormClasificacionContratoComponent implements OnInit {
  tituloArchivo: string;
  xVariables :string;
  xParrafoGeneral='';

  public clasificacionContratoRequest: ClasificacionContratoRequest = new ClasificacionContratoRequest();

  constructor(private _location: Location,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private clasificacionContratoService : ClasificacionContratoService) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }

  Grabar():void{

    this.clasificacionContratoRequest.Descripcion = this.xParrafoGeneral;
    this.clasificacionContratoRequest.Usuario = 'ntrucios';
    this.clasificacionContratoRequest.Terminal= 'CYRREC04';
    console.log(this.clasificacionContratoRequest);
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
  AgregarVariable()
  {
    this.xVariables = '@x'+this.xVariables+'@'
    this.xParrafoGeneral = this.xParrafoGeneral+' '+this.xVariables;
    this.xVariables ='';
  }

  DescargarPlantilla()
  {
    if (this.clasificacionContratoRequest.Nombre==null){
      alertifyjs.error('Ingrese nombre de plantilla');
    }
    else {
    let htmlDocument = '<!DOCTYPE html><html><head> <meta charset="utf-8"> <title></title> </head>';
    htmlDocument = htmlDocument+ '  <head><body>'+this.xParrafoGeneral+'</body>   </html> ';
    const converted=htmlDocx.asBlob(htmlDocument);
    saveAs(converted, this.clasificacionContratoRequest.Nombre+'.docx');
    }
  }
}
