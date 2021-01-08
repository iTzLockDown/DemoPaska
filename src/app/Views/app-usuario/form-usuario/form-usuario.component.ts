import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../Models/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../Services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent implements OnInit {
  private usuarios: Usuario = new Usuario();

  private titulo = 'Formulario de Usuario Cliente';
  private errores: string[];
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.cargarCliente();
  }
  // cargarCliente(): void {
  //   this.activatedRoute.params.subscribe(
  //     params => {
  //       let cCodigoUsu = params['cCodigoUsu']
  //       if (cCodigoUsu) {
  //         this.usuarioService.getUsuario(cCodigoUsu).subscribe(
  //           (usuarios) => this.usuarios = usuarios);
  //       }
  //     });
  // }

  // public create(): void {
  //   this.usuarioService.create(this.usuarios)
  //     .subscribe(
  //       json => {
  //         this.router.navigate(['/usuarios'])
  //         console.log('usuario creado');
  //         //Swal.fire('Nuevo Usuario ', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
  //         },
  //       err => {
  //         this.errores = err.error.errors as string[];
  //       }
  //     );
  // }
  // update(): void {
  //   this.usuarioService.update(this.usuarios)
  //     .subscribe(json => {
  //         this.router.navigate(['/usuarios'])
  //        console.log('usuario editado');
  //         // Swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
  //       },
  //       err => {
  //         this.errores = err.error.errors as string[];
  //       }
  //     );
  // }

  // compararPerfil(obj1: Perfileusuario, obj2: Perfileusuario): boolean {
  //   if (obj1 === undefined && obj2 === undefined) {
  //     return true;
  //   }
  //   return obj1 == null || obj2 == null ? false : obj1.id === obj2.id;
  // }
}
