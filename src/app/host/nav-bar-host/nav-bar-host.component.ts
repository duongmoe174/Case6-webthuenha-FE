import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationDetailService} from '../../service/notification-detail/notification-detail.service';
import {ProfileService} from '../../service/profile/profile.service';

@Component({
  selector: 'app-nav-bar-host',
  templateUrl: './nav-bar-host.component.html',
  styleUrls: ['./nav-bar-host.component.css']
})
export class NavBarHostComponent implements OnInit {
  currentUser: any = {};
  listNotificationDetail: any[] = [];
  profile: any = {};


  constructor(private authService: AuthService,
              private router: Router,
              private notificationDetailService: NotificationDetailService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getProfileHost(id) {
    this.profileService.getHostByAppUserId(id).subscribe(profileBE => {
      this.profile = profileBE;
    });
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.getAllNotificationDetailByCurrentId();
    this.getProfileHost(this.currentUser.id);
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  getAllNotificationDetailByCurrentId() {
    this.notificationDetailService.getAllNotificationDetailByIdUser(this.currentUser.id).subscribe((listBE) => {
      this.listNotificationDetail = listBE;
    });
  }


  deleteAllNotificationDetailByIdUser() {
    this.notificationDetailService.deleteAllNotificationDetailByIdUser(this.currentUser.id).subscribe(() => {
      this.getAllNotificationDetailByCurrentId();
      this.router.navigateByUrl('/notification');
    });
  }
}
