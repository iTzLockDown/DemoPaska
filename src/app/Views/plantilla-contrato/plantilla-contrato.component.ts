import { Component, OnInit } from '@angular/core';
import {PdfMakeWrapper, Txt} from 'pdfmake-wrapper';

@Component({
  selector: 'app-plantilla-contrato',
  templateUrl: './plantilla-contrato.component.html'
})
export class PlantillaContratoComponent implements OnInit {

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
}
