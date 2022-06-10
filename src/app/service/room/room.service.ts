import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {House} from '../../model/house';
import {HttpClient} from '@angular/common/http';
import {Room} from '../../model/room';


const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/houses/room`);
  }
}
