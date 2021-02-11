import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {ClasificacionContratoService} from '../../Services/clasificacion-contrato.service';
import {ClasificacionContratoResponse} from '../../Models/Response/ClasificacionContratoResponse';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import { saveAs } from "file-saver";
import * as htmlDocx from 'html-docx-js/dist/html-docx';

@Component({
  selector: 'app-clasificacion-contrato',
  templateUrl: './clasificacion-contrato.component.html',
})
export class ClasificacionContratoComponent implements OnInit {
  modalRef: BsModalRef;
  variableReemplazado:string;
  clasificacionContrato : ClasificacionContratoResponse[];
  objClasificacionContrato:ClasificacionContratoResponse;
  constructor(private modalService: BsModalService,
              private router: Router,
              private clasificacionContratoService: ClasificacionContratoService) { }

  ngOnInit(): void {
    this.clasificacionContratoService.Listar().subscribe(
      response => this.clasificacionContrato = response
    );
  }
  agregar(template: TemplateRef<any>) {

    this.abrirModal(template);
  }

  abrir(tipo: ClasificacionContratoResponse, template: TemplateRef<any>) {
    this.objClasificacionContrato = tipo;

    this.abrirModal(template);

  }


  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray' })
    );
    this.variables = [];
    this.BuscarVariables();
  }
  /*  OBJ */

  variables: string[] = [];

  textoDeInput='';






  BuscarVariables()
  {
    this.variableReemplazado = this.objClasificacionContrato.Descripcion;
    var division = this.variableReemplazado.split('@');
    console.log(division);
    for (var i in division){
      if (division[i].includes('|')){
        this.variables.push(division[i]);
      }
    }

    this.variables.filter(variables=> variables.indexOf('x'))
    console.log(this.variables)
  }

  Reemplazar(variable: string){
    variable='@'+variable+'@';
    this.variableReemplazado = this.variableReemplazado.replace(variable, this.textoDeInput );

  }

  IngresaVariable(event)
  {
    this.textoDeInput = event.target.value;
  }


  public download(): void {
    let htmlDocument = '<!DOCTYPE html><html><head> <meta charset="utf-8"> <title></title> </head>';
    htmlDocument = htmlDocument+ '  <head><body>'+this.variableReemplazado +'</body>   </html> ';
    const converted=htmlDocx.asBlob(htmlDocument);
    saveAs(converted, this.objClasificacionContrato.Nombre+'.docx');
  }



}
