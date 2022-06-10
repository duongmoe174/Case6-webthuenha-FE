import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../service/house/house.service';
import {Router} from '@angular/router';
import {House} from '../../../model/house';


@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: House[] = [];
  constructor(private houseService: HouseService,
              private router: Router) { }

  ngOnInit() {
    this.getAllHouse();
  }

  getAllHouse() {
    this.houseService.getAll().subscribe((data) => {
      this.houses = data;
    }, (error) => {
    });
  }

}
