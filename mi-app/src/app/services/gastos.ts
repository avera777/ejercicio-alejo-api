import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private apiUrl = 'http://localhost:5127/expenses';

  constructor(private http: HttpClient) {}

  getGastos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  agregarGasto(gasto: any) {
    return this.http.post(`${this.apiUrl}/add`, gasto);
  }


  actualizarGasto(id: number, gasto: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, gasto);
  }


  eliminarGasto(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}