import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../model/user';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  update = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password): Observable<UserToken> {
    return this.http.post<any>(`${API_URL}/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user)); // ép kiểu JSON trả về từ BE thành dạng chuỗi
        this.currentUserSubject.next(user); // gán giá trị của user vào currentUserSubject
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(signUpForm): Observable<any> {
    return this.http.post<any>(`${API_URL}/signupUser`, signUpForm);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`);
  }

  registerHost(singUpForm): Observable<any> {
    return this.http.post<any>(`${API_URL}/signupHost`, singUpForm);
  }
}
