import { Component, OnInit } from '@angular/core';
import {House} from '../../../model/house';
import {HouseService} from '../../../service/house/house.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  id: number;
  house: House;
  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paramMap)=>{
      this.id = + paramMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
  }

  getHouseById(id) {
    this.houseService.findById(this.id).subscribe((data) => {
      this.house = data;
    }, (error) => {
    });
  }

}
