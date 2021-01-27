import { Component, OnInit } from '@angular/core';
import {GarantiaService} from "../Services/garantia.service";

@Component({
  selector: 'app-pruebascraping',
  templateUrl: './pruebascraping.component.html',
  styleUrls: ['./pruebascraping.component.css']
})
export class PruebascrapingComponent implements OnInit {

  constructor(private garantiaServide : GarantiaService) { }

  ngOnInit(): void {
    this.garantiaServide.PruebaScraping().subscribe(
      response => console.log(response)
    );

  }

}
