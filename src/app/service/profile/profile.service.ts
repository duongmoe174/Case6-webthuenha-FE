import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  editProfile(id, profile) {
    return this.http.post(`${API_URL}/profile/guest/edit/${id}`, profile);
  }
  editProfileHost(id, profile) {
    return this.http.post(`${API_URL}/profile/host/edit/${id}`, profile);
  }

  getProfileByUserId(id): Observable<any> {
    return this.http.get<any>(`${API_URL}/profile/guest/${id}`);
  }

  getGuestByAppUserID(id): Observable<any> {
    return this.http.get<any>(`${API_URL}/profile/findGuestByAppUserId/${id}`);
  }

  getProfileByHostId(id): Observable<any> {
    return this.http.get<any>(`${API_URL}/profile/host/${id}`);
  }

  getHostByAppUserId(id): Observable<any> {
    return this.http.get<any>(`${API_URL}/profile/findHostByAppUserId/${id}`);
  }
}
