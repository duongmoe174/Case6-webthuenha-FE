import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {House} from '../../model/house';


const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses/randomHouse`);
  }
}
