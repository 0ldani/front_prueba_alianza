import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  constructor(private http: HttpClient) {}

  private readonly url = `${environment.apiBaseUrl}/login`;
  

  login(usuario: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('nombre', usuario)
      .set('pass', password);

    return this.http.post(this.url, null, { params });
  }

  guardarToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
