import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../service/profile/profile.service';
import {House} from '../model/house';
import {HouseService} from '../service/house/house.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any = {};
  profile: any = {};
  housesRandom: House[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private profileService: ProfileService,
              private houseService: HouseService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getRandom9House();
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
  getRandom9House() {
    this.houseService.getRandom9House().subscribe((housesRandomBE) => {
      this.housesRandom = housesRandomBE;
    });
  }

  viewHouseById(id) {
    this.router.navigateByUrl('/view/' + id);
  }
}
