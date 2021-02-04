import { Component, OnInit } from '@angular/core';
import { saveAs } from "file-saver";
import {AlignmentType, Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun} from "docx";
import {ClienteResponse} from "../../Models/Response/ClienteResponse";

@Component({
  selector: 'app-generador-contrato',
  templateUrl: './generador-contrato.component.html',
})
export class GeneradorContratoComponent implements OnInit {

  array1 = ['a', 'b', 'c'];




  xParrafoGeneral='Esta el @xcliente@ y el contratista con ruc n° @xruc@ y sus documentos.' ;

  xParrafoStyle='Esta el &#titulo @xcliente@ para mas cosas de pruuebas& y  @xruc@ el &$Titulo emulador & con ruc n° &%Parrafo @xdeveloper@ comparacion& y sus documentos.' ;

  clienteResponse: ClienteResponse = new ClienteResponse();

  variables: string[] = [];

  stylachos: string[] = [];
  textoDeInput='';
  constructor() { }

  ngOnInit(): void {
    this.BuscarVariables();
  }
  BuscarVariables()
  {
    var division = this.xParrafoStyle.split('@');




    for (var i in division){
      if (division[i].includes('x')){
        this.variables.push(division[i]);
      }

    }
    this.variables.filter(variables=> variables.indexOf('x'))
  }
  Reemplazar(variable: string){
    variable='@'+variable+'@';
    this.xParrafoStyle = this.xParrafoStyle.replace(variable, this.textoDeInput );

  }

  IngresaVariable(event)
  {
    this.textoDeInput = event.target.value;
  }


  public download(): void {
    console.log(this.clienteResponse);
    Packer.toBlob(this.create()).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  public create(): Document {

    var style = this.xParrafoStyle.split('&');

    for (var i in style) {
      if (style[i].includes('#') || style[i].includes('$')||style[i].includes('%')){
        this.stylachos.push(style[i]);
      }
    }
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
        console.log(this.stylachos)
        document.addSection({
          children: [
            this.titulo(this.stylachos[i])
          ],
        });
      }
      if (this.stylachos[i].includes('%') ){
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
