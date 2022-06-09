import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  users: User[] = [];
  user: any;
  message: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.getAllUser();
    this.getCurrentUser();
  }

  login() {
    console.log(this.loginForm.get('username').value);
    console.log(this.loginForm.get('password').value);
    console.log(this.currentUser);
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe((res) => {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_USER') {
          this.router.navigateByUrl('/user');
        }
        if (role.authority === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/admin');
        }
        if (role.authority === 'ROLE_HOST') {
          this.router.navigateByUrl('/host');
        }
      }
    }, error => {
      for (let user of this.users) {
        if (user.username !== this.loginForm.get('username').value || user.password !== this.loginForm.get('password').value) {
          this.message = 'Wrong account or password';
        }
      }
    });
  }

  getAllUser() {
    this.authService.getAllUser().subscribe((listUserFromBE) =>
      this.users = listUserFromBE);
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }
}
