import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  }

  login() {
    console.log(this.loginForm.get('username').value);
    console.log(this.loginForm.get('password').value);
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe((res) => {
      this.router.navigateByUrl('/user');
    }, error => {
      for (let user of this.users) {
        if (user.username !== this.loginForm.get('username').value) {
          this.message = 'Wrong account or password';
        }
        this.message = 'success!';
      }
    });
  }
  getAllUser() {
    this.authService.getAllUser().subscribe((listUserFromBE) =>
      this.users = listUserFromBE);
  }
}
