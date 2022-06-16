import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class InformationSaveService {

  constructor(private http: HttpClient) { }
  get10InformationSaveByIdUserActive(id) {
    return this.http.get<any>(`${API_URL}/informationSave/active/${id}`);
  }

  getAllInformationSaveByIdUserIsActive(id) {
    return this.http.get<any>(`${API_URL}/informationSave/${id}`);
  }

  changeActiveInformation(id) {
    return this.http.get<any>(`${API_URL}/informationSave?id=${id}`);
  }
}
