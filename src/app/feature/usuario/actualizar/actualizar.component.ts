import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../services/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarComponent {

  idUsuario: string | null = null;

  usuario = {
    id: '',
    nombre: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    if (this.idUsuario) {
      this.obtenerUsuario(this.idUsuario);
    }
  }

  onSubmit() {
    this.usuarioService.actualizar(this.usuario).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion exitosa',
          detail: 'Usuario actualizado correctamente',
        });
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

  obtenerUsuario(id: string): void {
    this.usuarioService.consultarPorId(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
      }
    });
  }

}
