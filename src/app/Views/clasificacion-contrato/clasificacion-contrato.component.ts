import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {ClasificacionContratoService} from '../../Services/clasificacion-contrato.service';
import {ClasificacionContratoResponse} from '../../Models/Response/ClasificacionContratoResponse';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import { saveAs } from "file-saver";
import {Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun} from "docx";

@Component({
  selector: 'app-clasificacion-contrato',
  templateUrl: './clasificacion-contrato.component.html',
})
export class ClasificacionContratoComponent implements OnInit {
  modalRef: BsModalRef;
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

  stylachos: string[] = [];
  textoDeInput='';
  xParrafoGeneral='Esta el @xcliente@ y el contratista con ruc n° @xruc@ y sus documentos.' ;

  xParrafoStyle='Esta el &#titulo @xcliente@ para mas cosas de pruuebas& y  @xruc@ el &$Titulo emulador & con ruc n° &%Parrafo @xdeveloper@ comparacion& y sus documentos.' ;

  /* BUSCANDO VARIABLES  */




  BuscarVariables()
  {
    var division = this.objClasificacionContrato.Descripcion.split('@');




    for (var i in division){
      if (division[i].includes('x')){
        this.variables.push(division[i]);
      }

    }
    this.variables.filter(variables=> variables.indexOf('x'))
  }
  Reemplazar(variable: string){
    variable='@'+variable+'@';
    this.objClasificacionContrato.Descripcion = this.objClasificacionContrato.Descripcion.replace(variable, this.textoDeInput );

  }

  IngresaVariable(event)
  {
    this.textoDeInput = event.target.value;
  }


  public download(): void {
    Packer.toBlob(this.create()).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  public create(): Document {

    var style = this.objClasificacionContrato.Descripcion.split('&');

    for (var i in style) {
      if (style[i].includes('#') || style[i].includes('$')||style[i].includes('%')){
        this.stylachos.push(style[i]);
      }
    }
    console.log(this.stylachos);
    const document = new Document();
    for (var i in this.stylachos) {
      if (this.stylachos[i].includes('#') ){
        document.addSection({
          children: [
            this.titulo(this.stylachos[i])
          ],
        });
      }
      if (this.stylachos[i].includes('$') ){
        document.addSection({
          children: [
            this.titulo(this.stylachos[i])
          ],
        });
      }
      if (this.stylachos[i].includes('%') ){
        console.log(this.stylachos[i])
        document.addSection({
          children: [
            this.parrafo(this.stylachos[i])
          ],
        });
      }
    }



    return document;
  }

  public createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }
  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }


  public titulo(text: string) : Paragraph{
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: text,
          bold: true,
        }),
      ],
    });
  }
  public negrita(text: string) : Paragraph{
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: text,
          bold: true,
        }),
      ],
    });
  }
  public parrafo(text: string) : Paragraph{
    return new Paragraph({
      bullet: {
        level: 0,
      },
      children: [
        new TextRun({
          text: text,
        }),
      ],
    });
  }


}
