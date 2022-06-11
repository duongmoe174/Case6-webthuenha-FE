import {Component, OnInit} from '@angular/core';
import {Profile} from '../../model/profile';
import {ProfileService} from '../../service/profile/profile.service';
import {Router} from '@angular/router';
import {NotifiService} from '../../service/alert/notifi.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  showInputImage = false;
  profile: Profile = {};
  currentUser: any = {};
  filePath = '';
  selectedFile: File[] = [];
  user: User = {};

  constructor(private profileService: ProfileService,
              private router: Router,
              private notifiService: NotifiService) {
  }
  profileForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    image: new FormControl(),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]),
    user: new FormControl(),
  });

  ngOnInit() {
    this.getCurrentUser();
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile[0]);
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.getProfile(this.currentUser.id);
  }

  getProfile(id) {
    this.profileService.getGuestByAppUserID(id).subscribe(profileBE => {
      this.profile = profileBE;
      this.phoneControl.setValue(this.profile.phone);
      this.addressControl.setValue(this.profile.address);
      this.emailControl.setValue(this.profile.email);
      this.fullNameControl.setValue(this.profile.fullName);
    });
  }

  isShowInputImage() {
    this.showInputImage = !this.showInputImage;
  }

  get phoneControl() {
    return this.profileForm.get('phone');
  }

  get addressControl() {
    return this.profileForm.get('address');
  }

  get fullNameControl() {
    return this.profileForm.get('fullName');
  }

  get emailControl() {
    return this.profileForm.get('email');
  }

  submitEditProfileGuest() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.profileForm.value.fullName);
      formData.append('address', this.profileForm.value.address);
      if (this.showInputImage) {
        const files = (document.getElementById('image') as HTMLInputElement).files;
        if (files.length > 0) {
          formData.append('image', files[0]);
        }
      }
      formData.append('email', this.profileForm.value.email);
      formData.append('phone', this.profileForm.value.phone);
      this.profileService.editProfile(this.profile.id, formData).subscribe(() => {
        this.showInputImage = false;
        this.notifiService.showMessage('success', 'Edit!', 'Chỉnh sửa thành công');
        this.getProfile(this.currentUser.id);
      }, error => this.notifiService.showMessage('error', 'Edit!', 'Chỉnh sửa lỗi'));
    } else {
      this.notifiService.showMessage('error', 'Edit!', 'Chỉnh sửa lỗi');
    }
  }
}
