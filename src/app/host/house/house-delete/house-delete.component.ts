import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HouseService} from '../../../service/house/house.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-house-delete',
  templateUrl: './house-delete.component.html',
  styleUrls: ['./house-delete.component.css']
})
export class HouseDeleteComponent implements OnInit {
  selectedFile = null;
  houseForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    room_category: new FormControl(),
    address: new FormControl(),
    numberOfBedroom: new FormControl(),
    numberOfBathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
    status: new FormControl(),
  });
  id: number;
  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe((paraMap) => {
      this.id = + paraMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  getHouseById(id) {
    this.houseService.findById(id).subscribe((house) => {
      this.houseForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(house.name),
        room_category: new FormControl(house.room_category.name),
        address: new FormControl(house.address),
        numberOfBedroom: new FormControl(house.numberOfBedroom),
        numberOfBathroom: new FormControl(house.numberOfBathroom),
        description: new FormControl(house.description),
        price: new FormControl(house.price),
        image: new FormControl(house.image),
        status: new FormControl(house.status)
      });
    });
  }

  delete(id) {
    this.houseService.delete(id).subscribe(() => {
      this.router.navigateByUrl('/houses');
    });
  }

}
