import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ChangePasswordService} from '../../service/changePassword/change-password.service';
import {Router} from '@angular/router';
import {NotifiService} from '../../service/alert/notifi.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../service/profile/profile.service';
import {Profile} from '../../model/profile';
import {ChangePasswordForm} from '../../model/change-password-form';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.css']
})
export class ChangePasswordUserComponent implements OnInit {
  currentUser: any;
  changePassForm: FormGroup;
  users: User = {};
  changePasswordForm: ChangePasswordForm = {};
  user: any;
  message: string = null;
  guest: any;

  constructor(private changePassService: ChangePasswordService,
              private fb: FormBuilder,
              private router: Router,
              private notifi: NotifiService,
              private userSer: ProfileService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getUserByAppUserId(this.currentUser.id);
    this.changePassForm = this.fb.group({
      oldPassword: '',
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*)(?=.*).{6,8}$')]],
      confirmPassword: '',
    });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  getUserByAppUserId(id) {
    this.userSer.getGuestByAppUserID(id).subscribe(guestObject => {
      this.guest = guestObject;
    });
  }

  changePassword() {
    this.user = {
      username: this.currentUser.username,
      currentPassword: this.currentUser.password,
      newPassword: this.changePassForm.value.newPassword,
      confirmPassword: this.changePassForm.value.confirmPassword,
    };
    this.changePasswordForm = {
      oldPassword: this.changePassForm.value.oldPassword,
      newPassword: this.changePassForm.value.newPassword,
      confirmPassword: this.changePassForm.value.confirmPassword
    };
    this.changePassService.changePassUser(this.guest.id, this.changePassForm.value).subscribe(() => {
      this.notifi.showMessage('success', 'OK!', 'Đổi mật khẩu thành công');
      this.router.navigateByUrl('/user');
    }, error => {
      this.notifi.showMessage('error', 'X', 'Không thành công');
    });
  }
}
