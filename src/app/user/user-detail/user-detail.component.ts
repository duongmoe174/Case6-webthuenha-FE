import { Component, OnInit } from '@angular/core';
import {House} from '../../model/house';
import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  id: number;
  house: House = {};
  houses: House[] = [];
  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      this.id = + paramMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
    this.getHouseById(this.id);
  }

  getHouseById(id) {
    this.userService.findById(this.id).subscribe((data) => {
      this.house = data;
    }, (error) => {
    });
  }

}
