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

}
