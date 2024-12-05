import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../services/usuario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.scss'
})
export class ConsultarComponent {

  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.consultar().subscribe({
      next: (data) => {
        this.usuarios = data.map((usuario: any) => {
          usuario.roles = usuario.roles.map((rol: { nombre: string; }) => rol.nombre).join(', ')
          return usuario;
        })
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al consultar usuarios',
        });
      }
    });
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminar(id).subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
      },
      error: (err) => {
        if (err.status === 403) {
          this.messageService.add({
            severity: 'error',
            summary: 'Permiso Denegado',
            detail: 'No tiene permiso para realizar esta acción.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al eliminar el usuario.',
          });
        }
      }
    });
  }

  crearUsuario(){
    this.router.navigate(['/crear']);
  }

  actualizarUsuario(id: string){
    this.router.navigate(['/actualizar', id]);
  }
}
