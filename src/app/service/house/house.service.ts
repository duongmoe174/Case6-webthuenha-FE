import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../../model/house';


const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<House[]> {
      return this.http.get<House[]>(`${API_URL}/houses/list`);
  }

  findById(id): Observable<House> {
    return this.http.get<House>(`${API_URL}/houses/${id}`);
  }

  create(house): Observable<House> {
    return this.http.post<House>(`${API_URL}/houses`, house);
  }

  update(id, data): Observable<House> {
    return this.http.post(`${API_URL}/houses/${id}`, data);
  }

  delete(id): Observable<House> {
    return this.http.delete(`${API_URL}/houses/${id}`);
  }

  getRandom9House(): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses/random`);
  }
}
