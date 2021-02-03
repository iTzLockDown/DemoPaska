import { Component, OnInit } from '@angular/core';
import { saveAs } from "file-saver";
import {AlignmentType, Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun} from "docx";
import {ClienteResponse} from "../../Models/Response/ClienteResponse";
import {experiences} from "../plantilla-contrato/con-data";

@Component({
  selector: 'app-generador-contrato',
  templateUrl: './generador-contrato.component.html',
})
export class GeneradorContratoComponent implements OnInit {
  xParrafoGeneral='Esta el @xcliente@ y el contratista con ruc n° @xruc@ y sus documentos.' ;

  clienteResponse: ClienteResponse = new ClienteResponse();

  variables: string[] = [];
  textoDeInput='';
  constructor() { }

  ngOnInit(): void {
    this.BuscarVariables();
  }
  BuscarVariables()
  {
    var division = this.xParrafoGeneral.split('@');

    for (var i in division){
      if (division[i].includes('x')){
        this.variables.push(division[i]);
      }

    }
    this.variables.filter(variables=> variables.indexOf('x'))
  }
  Reemplazar(variable: string){
    variable='@'+variable+'@';
    this.xParrafoGeneral = this.xParrafoGeneral.replace(variable, this.textoDeInput );

  }

  IngresaVariable(event)
  {
    this.textoDeInput = event.target.value;
  }


  public download(): void {
    console.log(this.clienteResponse);
    Packer.toBlob(this.create([experiences])).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  public create([educations]): Document {

    const document = new Document();

    document.addSection({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun({
              text: "CONTRATO DE COMPRA-VENTA CON CLAUSULAS ADICIONALES DE PRESTAMO “CREDITO MI VIVIENDA” Y CONSTITUCION DE GARANTIA HIPOTECARIA",
              bold: true,
            })
          ],
        }),

        new Paragraph({

            children: [
              new TextRun({
                  text: "Sírvase extender en su registro de escrituras públicas ",

                },
              ),
              new TextRun({
                  text: "EL CONTRATO DE COMPRA-VENTA CON CLAUSULAS ADICIONALES DE PRESTAMO “CREDITO MI VIVIENDA” Y CONSTITUCION DE GARANTIA HIPOTECARIA, ",
                  bold: true,
                },
              ),
              new TextRun({
                  text: "que celebramos:",
                },
              )
            ],
          }
        ),
        new Paragraph({
          text: "De una parte, en calidad de ",
          bullet: {
            level: 0,
          },
          children: [
            new TextRun({
                text: "VENDEDORA ",
                bold: true
              },
            ),
            new TextRun({
                text: "la empresa ",
              },
            ),
            new TextRun({
                text: "CONSTRUCTORA, CONSULTORA Y SERVICIOS GENERALES STORBY SOCIEDAD ANONIMA CERRADA, ",
                bold: true
              },
            ),
            new TextRun({
                text: ", identificada con RUC. Nº 20568250703, con domicilio fiscal en Jr. Nemesio Raez N° 1050 (A una cuadra de la Comisaria del Tambo), del Distrito de el Tambo, Provincia de Huancayo, Departamento de Junín, debidamente representada por su Gerente General señor",
              },
            ),

            new TextRun({
                text: "ALARCON ONOFRE FERNANDO, ",
                bold: true
              },
            ),
            new TextRun({
                text: "identificado con D.N.I. Nº 09968827, según facultades inscritas en la Partida Nº 11162680 del Registro de Personas Jurídicas de la Oficina Registral de Huancayo – Zona Registral Nº VIII – Sede Huancayo, a quien en adelante se le denominara ",
              },
            ),
            new TextRun({
                text: "VENDEDORA ",
                bold: true
              },
            ),
          ],

        }),
        new Paragraph({
          text: this.xParrafoGeneral.toUpperCase()
        }),
        new Paragraph({

          children: [
            new TextRun({
                text: "Bajo las cláusulas y condiciones siguientes: ",

              },
            ),
          ],
        }),
        new Paragraph({
          properties: {
            lineNumberCountBy: 1,
          },
          children: [

            new TextRun({
                text: "ANTECEDENTES",
                bold: true,
              },
            ),
          ],
        }),
        new Paragraph({

          children: [
            new TextRun({
                text: "PRIMERA.- LA VENDEDORA es única y exclusiva propietaria de la Unidad Inmobiliaria denominada SEPTIMO PISO – DEPARTAMENTO 702 de la Edificación existente sobre el predio ubicado en el Jr. Nemesio Raez N° 1050, del Distrito de el Tambo, Provincia de Huancayo, Departamento de Junín, cuya extensión superficial, medidas perimétricas, linderos y demás especificaciones técnicas se encuentran inscritas en la Partida Nº 11207510 del Registro de Predios de la Zona Registral N° VIII – Sede Huancayo - Oficina Registral de Huancayo. ",

              },
            ),
          ],
        }),
        new Paragraph({

          children: [
            new TextRun({
                text: "SEGUNDA.- LA VENDEDORA es única y exclusiva propietaria de la Unidad Inmobiliaria denominada SEPTIMO PISO – DEPARTAMENTO 702 de la Edificación existente sobre el predio ubicado en el Jr. Nemesio Raez N° 1050, del Distrito de el Tambo, Provincia de Huancayo, Departamento de Junín, cuya extensión superficial, medidas perimétricas, linderos y demás especificaciones técnicas se encuentran inscritas en la Partida Nº 11207510 del Registro de Predios de la Zona Registral N° VIII – Sede Huancayo - Oficina Registral de Huancayo. ",

              },
            ),
          ],
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun({
              text: "CONTRATO DE COMPRA-VENTA CON CLAUSULAS ADICIONALES DE PRESTAMO “CREDITO MI VIVIENDA” Y CONSTITUCION DE GARANTIA HIPOTECARIA",
              bold: true,
            })
          ],
        }),

        ...educations
          .map((education) => {
            const arr: Paragraph[] = [];
            arr.push(
              this.createInstitutionHeader('jackpot', `2010 - 2020`),
            );
            arr.push(this.createRoleText(`Computer Science- semi senior`));
            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
      ],
    });
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
  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n");
  }
  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  }
}
