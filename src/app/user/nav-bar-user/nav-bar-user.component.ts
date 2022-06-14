import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../service/profile/profile.service';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})
export class NavBarUserComponent implements OnInit {
  currentUser: any = {};
  profile: any = {};

  constructor(private authService: AuthService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getProfileByUserId() {
    this.profileService.getGuestByAppUserID(this.currentUser.id).subscribe((profileBE) => {
      this.profile = profileBE;
    });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.getProfileByUserId();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
