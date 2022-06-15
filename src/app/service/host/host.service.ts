import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../model/room';
import {Host} from '../../model/host';


const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private http: HttpClient) { }

  getHostById(id): Observable<Host> {
    return this.http.get<Host>(`${API_URL}/houses/hosts/${id}`);
  }

  getAll(): Observable<Host[]> {
    return this.http.get<Host[]>(`${API_URL}/houses/host`);
  }

}
