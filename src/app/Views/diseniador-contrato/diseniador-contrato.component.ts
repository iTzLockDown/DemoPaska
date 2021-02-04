import { Component, OnInit } from '@angular/core';
import {concat} from "rxjs";

@Component({
  selector: 'app-diseniador-contrato',
  templateUrl: './diseniador-contrato.component.html',
})
export class DiseniadorContratoComponent implements OnInit {
  xVariables :string;
  xParrafo:string;
  xParrafoGeneral='';
  xDisenioGeneral='';
  negrita= false;
  titulo = false;
  parrafo = false;
  constructor() { }

  ngOnInit(): void {
  }

  AgregarVariable()
  {
    this.xVariables = '@'+this.xVariables+'@'
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
      this.xParrafoGeneral = '&n'+this.xParrafoGeneral+'&'
    }
    if(this.titulo){
      this.xParrafoGeneral = '&t'+this.xParrafoGeneral+'&'
    }
    if(this.parrafo){
      this.xParrafoGeneral = '&p'+this.xParrafoGeneral+'&'
    }

    this.xDisenioGeneral = '\n \t'+this.xDisenioGeneral+' '+this.xParrafoGeneral;
    this.xParrafoGeneral = '';
    this.xParrafo = '';
    this.parrafo=false;
    this.titulo=false;
    this.negrita=false;

  }

}
