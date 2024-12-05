import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../core/services/auth/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(
    private messageService: MessageService,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  onSubmit() {
    this.autenticacionService.login(this.usuario, this.password).subscribe({
      next: (response) => {
        this.autenticacionService.guardarToken(response.token);
        this.messageService.add({
          severity: 'success',
          summary: 'Login exitoso',
          detail: 'Bienvenido!',
        });
        this.router.navigate(['/consultar']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login fallido',
          detail: err.error.mensaje,
        });
      },
    });
  }
}
