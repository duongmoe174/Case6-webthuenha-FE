import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../service/profile/profile.service';
import {House} from '../model/house';
import {UserService} from '../service/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any = {};
  profile: any = {};
  house: House = {};
  houses: House[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private profileService: ProfileService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getRandomHouse();
  }

  getRandomHouse() {
    this.userService.getAll().subscribe((data) => {
      this.houses = data;
    }, (error) => {
    });
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
