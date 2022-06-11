import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {
  }

  changePassUser(id, changePassForm) {
    return this.http.post(`${API_URL}/profile/guest/changePassword/${id}`, changePassForm);
  }

  changePassHost(id, changePassForm) {
    return this.http.post(`${API_URL}/profile/host/changePassword/${id}`, changePassForm);
  }
}
