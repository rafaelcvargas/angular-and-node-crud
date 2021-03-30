import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { ClientSearchResults } from '../models/clientSearchResults.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClientSearchResults> {
    return this.http.get<ClientSearchResults>(environment.apiUrl);
  }

  get(id: any): Observable<Client> {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.apiUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }

  getWithFilter(firstName: string, lastName: string, email: string): Observable<ClientSearchResults> {
    return this.http.get<ClientSearchResults>(`${environment.apiUrl}?firstName=${firstName}&lastName=${lastName}&email=${email}`);
  }
}
