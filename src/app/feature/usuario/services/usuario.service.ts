import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private readonly url = `${environment.apiBaseUrl}/usuario`;
  

  consultar(): Observable<any> {
    return this.http.get(this.url);
  }

  consultarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  eliminar(id: number):Observable<any> {
    const params = new HttpParams().set('id', id);

    return this.http.delete(this.url, { params });
  }

  crear(usuario: any):Observable<any> {
    return this.http.post(this.url, usuario);
  }

  actualizar(usuario: any):Observable<any> {
    return this.http.put(this.url, usuario);
  }
}
