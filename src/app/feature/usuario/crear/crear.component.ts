import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '../services/usuario.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.scss'
})
export class CrearComponent {

  usuario = {
    nombre: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.usuarioService.crear(this.usuario).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion exitosa',
          detail: 'Usuario creado correctamente',
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

}
