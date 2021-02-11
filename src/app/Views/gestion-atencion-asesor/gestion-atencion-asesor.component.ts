import { Component, OnInit } from '@angular/core';
import {AsesorResponse} from '../../Models/Response/AsesorResponse';
import {Router} from '@angular/router';
import {AsesorService} from '../../Services/asesor.service';
import {AsesorRequest} from '../../Models/Request/AsesorRequest';
import alertifyjs from 'AlertifyJS';

@Component({
  selector: 'app-gestion-atencion-asesor',
  templateUrl: './gestion-atencion-asesor.component.html'
})
export class GestionAtencionAsesorComponent implements OnInit {
  asesorColaUnica: AsesorResponse[];
  asesorColaMultiple: AsesorResponse[];
  asesorAsigna: AsesorRequest;

  constructor(private router: Router, private asesorService: AsesorService) {

  }
  ngOnInit() {
    this.Actualiza();
  }
  AsignaAsesoresColaMultiple(codigoUsuario: string ): void {
    this.asesorAsigna = new AsesorRequest();
    this.asesorAsigna.UsuarioAsesor = codigoUsuario;
    this.asesorAsigna.CodigoOficina = '001';
    this.asesorAsigna.Usuario = 'UsuarioWeb';
    this.asesorAsigna.Terminal = 'CYRREC04';
    this.asesorService.AsignaAsesoresColaMultiple(this.asesorAsigna).
    subscribe(
      (response) => {

        alertifyjs.success('Se agrego el usuario.');
        this.Actualiza();
        }
        ,
      error => {
        console.log(error)
      }
    );
  }
  AsignaAsesoresColaUnica(codigoUsuario: string ): void {
    this.asesorService.AsignaAsesoresColaUnica(codigoUsuario).subscribe(
      (response) =>
      {
        alertifyjs.error('Se ha quitado el usuario.');
        this.Actualiza();
      }
    );
  }
  Actualiza(): void {

    this.asesorService.AsesoresColaUnica()
      .subscribe(asesorColaUnica => this.asesorColaUnica = asesorColaUnica);

    this.asesorService.AsesoresColaMultiple()
      .subscribe(asesorColaMultiple => this.asesorColaMultiple = asesorColaMultiple);
  }

}
