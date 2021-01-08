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

  constructor(private router: Router, private asesorService: AsesorService) { }
  ngOnInit(){
    this.asesorService.AsesoresColaUnica()
      .subscribe(asesor => this.asesorColaUnica = asesor);

    this.asesorService.AsesoresColaMultiple()
      .subscribe(asesor => this.asesorColaMultiple = asesor);
  }

  AsignaAsesoresColaMultiple(codigoUsuario: string ):void
  {


    this.asesorAsigna = new AsesorRequest();
    this.asesorAsigna.UsuarioAsesor = codigoUsuario;
    this.asesorAsigna.CodigoOficina = 'string';
    this.asesorAsigna.Usuario = 'UsuarioWeb';
    this.asesorAsigna.Terminal = 'CYRREC04';
    this.asesorService.AsignaAsesoresColaMultiple(this.asesorAsigna).subscribe((response)=> alertifyjs.success('Se agrego el usuario.'));
    this.ngOnInit();
  }
  AsignaAsesoresColaUnica(codigoUsuario: string ):void
  {
    this.asesorService.AsignaAsesoresColaUnica(codigoUsuario).subscribe((response)=> alertifyjs.error('Se ha quitado el usuario.'));
    this.ngOnInit();
  }
  Actualiza(): void{

  }
}
