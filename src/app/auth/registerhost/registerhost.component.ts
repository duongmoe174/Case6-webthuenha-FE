import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registerhost',
  templateUrl: './registerhost.component.html',
  styleUrls: ['./registerhost.component.css']
})
export class RegisterhostComponent implements OnInit {

  user: any = {};
  formRegister: FormGroup;
  message: string = null;
  users: User[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,
  ) {
  }

  ngOnInit() {
    this.getAllUser();

    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*)(?=.*).{6,8}$')]],
      confirmPassword: [''],
    });
  }

  registerHost() {
    this.user = {
      username: this.formRegister.value.username,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      confirmPassword: this.formRegister.value.confirmPassword
    };
    for (let user of this.users) {
      if (user.username === this.user.username.toLowerCase()) {
        this.message = 'Account exited!';
        break;
      }
    }
    this.authService.registerHost(this.user).subscribe(() => {
      this.router.navigateByUrl('');
    }, error => {
    });
  }

  getAllUser() {
    this.authService.getAllUser().subscribe((listUserFromBE) =>
      this.users = listUserFromBE);
  }

}
