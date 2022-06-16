import { Component, OnInit } from '@angular/core';
import {House} from '../../../model/house';
import {HouseService} from '../../../service/house/house.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  id: number;
  house: House = {};
  houses: House[] = [];
  constructor(private houseService: HouseService,
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
    this.houseService.findById(this.id).subscribe((data) => {
      this.house = data;
    }, (error) => {
    });
  }
}
