import { Component, OnInit } from '@angular/core';
import {PdfMakeWrapper, Txt} from 'pdfmake-wrapper';
import {AlignmentType, Document, Packer, Paragraph, TabStopPosition, TabStopType, TextRun} from 'docx';
import { saveAs } from "file-saver";
import {ClienteResponse} from '../../Models/Response/ClienteResponse';
@Component({
  selector: 'app-generar-contrato',
  templateUrl: './generar-contrato.component.html',
})
export class GenerarContratoComponent implements OnInit {
  clienteResponse: ClienteResponse = new ClienteResponse();
  constructor() { }

  ngOnInit(): void {
  }
  generatePDF()
  {
    const pdf = new PdfMakeWrapper();
    pdf.add(
      new Txt('Hello world').bold().italics().end
    );
    pdf.create().open();
  }
  public download(): void {
    console.log(this.clienteResponse);
    Packer.toBlob(this.create()).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  public create() {

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
          text: "De la otra parte en calidad de ",
          bullet: {
            level: 0,
          },
          children: [

            new TextRun({
                text: "COMPRADORES ",
                bold: true
              },
            ),
            new TextRun({
                text: "la señora ",
              },
            ),
            new TextRun({
                text: this.clienteResponse.Nombre.toUpperCase(),
                bold: true
              },
            ),
            new TextRun({
                text: " identificada con D.N.I. N° "+this.clienteResponse.Documento+", quien declara ser de estado civil casada y su cónyuge el señor ",
              },
            ),
            new TextRun({
                text: "CENCIA DE LA CRUZ RAFAEL, ",
                bold: true
              },
            ),
            new TextRun({
                text: ", identificado con D.N.I. N° 40246709, quien declara ser de estado civil casado, ambos con domicilio en "+this.clienteResponse.Direccion+", Provincia de Huancayo, Departamento de Junín, a quienes en adelante se les denominará ",
              },
            ),
            new TextRun({
                text: "LOS COMPRADORES ",
                bold: true
              },
            ),
            new TextRun({
                text: "mas adelante",
                bold: true
              },
            ),
            new TextRun({
                text: "EL(LOS) CLIENTE(S) Y/O PRESTATARIO(S). ",
                bold: true
              },
            ),
          ],

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
      ],
    });
    return document;
  }
}
