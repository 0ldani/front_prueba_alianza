import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from '../services/auth/autenticacion.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autenticacionService = inject(AutenticacionService);
  const token = autenticacionService.obtenerToken();

  const solicitud = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(solicitud);
};