import { Component, OnInit } from '@angular/core';
import {House} from '../../model/house';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-user-book-house',
  templateUrl: './user-book-house.component.html',
  styleUrls: ['./user-book-house.component.css']
})
export class UserBookHouseComponent implements OnInit {
  currentUser: any = {};
  id: number;
  house: House = {};
  houses: House [] = [];
  orderForm: FormGroup = new FormGroup({
    house: new FormControl(),
    user: new FormControl(),
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
  });
  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
    this.getHouseById(this.id);
    this.getCurrentUser();
  }

  getHouseById(id) {
    this.userService.findById(this.id).subscribe((data) => {
      this.house = data;
    }, (error) => {
    });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  submitCreateOrder() {

  }
}
