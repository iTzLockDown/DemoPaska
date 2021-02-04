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

  xVariables :string;
  xParrafo:string;
  xParrafoGeneral='';
  xDisenioGeneral='';
  negrita= false;
  titulo = false;
  parrafo = false;

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

    this.clasificacionContratoRequest.Descripcion = this.xDisenioGeneral;
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

  AgregarParrafo()
  {
    this.xParrafoGeneral = this.xParrafoGeneral+' '+this.xParrafo;
    this.xParrafo ='';
  }
  cambiandoNegrita()
  {
    this.negrita = this.negrita? !this.negrita:!this.negrita;
    this.titulo=false;
    this.parrafo=false;
  }
  cambiandoTitulo()
  {
    this.titulo = this.titulo? false:true;
    this.negrita=false;
    this.parrafo=false;
  }

  cambiandoParrafo()
  {
    this.parrafo = this.parrafo? false:true;
    this.titulo=false;
    this.negrita=false;
  }
  AgregarDisenio()
  {
    if(this.negrita){
      this.xParrafoGeneral = '&#'+this.xParrafoGeneral+'&'
    }
    if(this.titulo){
      this.xParrafoGeneral = '&$'+this.xParrafoGeneral+'&'
    }
    if(this.parrafo){
      this.xParrafoGeneral = '&%'+this.xParrafoGeneral+'&'
    }

    this.xDisenioGeneral = this.xDisenioGeneral+' '+this.xParrafoGeneral;
    this.xParrafoGeneral = '';
    this.xParrafo = '';
    this.parrafo=false;
    this.titulo=false;
    this.negrita=false;

  }
}
