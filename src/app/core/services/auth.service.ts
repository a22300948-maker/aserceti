import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

 login(data: any) {
  console.log("Enviando al backend:", data);
  return this.http.post(`${this.apiUrl}/login`, data);
}
}