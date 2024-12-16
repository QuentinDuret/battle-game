import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) { }

  ping() {
    return this.http.get<{ping: string, ack: string}>(`${this.apiUrl}/ping`);
  }
}
