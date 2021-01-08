import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../Models/usuario';
import {UsuarioService} from '../../Services/usuario.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user';
import {AsesorResponse} from '../../Models/Response/AsesorResponse';
@Component({
  selector: 'app-usuario',
  templateUrl: './app-usuario.component.html'
})
export class AppUsuarioComponent implements OnInit{
  usuarios: Usuario[];
  user: User[];
 asesor: AsesorResponse[];
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  create(): void{
    this.router.navigate(['/dashboard/create']);
  }
  ngOnInit() {
     this.usuarioService.getUsuarios()
                        .subscribe(asesor => this.asesor = asesor);
  }
  //delete(usuario: Usuario): void {
    // Swal.fire({
    //   title: '¿Estas seguro?',
    //   text: `¿Estas seguro de eliminar ${usuario.nombre} ${usuario.apellidop}?`,
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, eliminar Cliente!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.usuarioService.delete(usuario.id).subscribe(
    //       response => {
    //         this.usuarios = this.usuarios.filter(user => user !== usuario)
    //         Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         );
    //       });
    //   }
    // });
  //
  //   this.usuarioService.delete(usuario.cCodigoUsu).subscribe(
  //         response => {
  //           this.usuarios = this.usuarios.filter(user => user !== usuario)
  //           // Swal.fire(
  //           //   'Deleted!',
  //           //   'Your file has been deleted.',
  //           //   'success'
  //           // );
  //         });
  // }
}
