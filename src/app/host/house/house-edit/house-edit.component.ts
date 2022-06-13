import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Room} from '../../../model/room';
import {HouseService} from '../../../service/house/house.service';
import {RoomService} from '../../../service/room/room.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.css']
})
export class HouseEditComponent implements OnInit {
  selectedFile = new File(['none'], 'filename.jpg');
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
  });
  id: number;
  rooms: Room[] = [];
  image = null;
  constructor(private houseService: HouseService,
              private roomsService: RoomService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      this.id = + paramMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
    this.getAllRoom();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
  }

  getHouseById(id: number) {
    return this.houseService.findById(id).subscribe((house) => {
      this.image = house.image;
      this.houseForm = new FormGroup({
        id: new FormControl(house.id),
        name: new FormControl(house.name),
        room_category: new FormControl(house.room_category.name),
        address: new FormControl(house.address),
        numberOfBedroom: new FormControl(house.numberOfBedroom),
        numberOfBathroom: new FormControl(house.numberOfBathroom),
        description: new FormControl(house.description),
        price: new FormControl(house.price),
        image: new FormControl(),
      });
    });
  }

  updateHouse(id: number) {
    const house: FormData = new FormData();
    house.append('id', this.houseForm.get('id').value);
    house.append('name', this.houseForm.get('name').value);
    house.append('room_category', this.houseForm.get('room_category').value);
    house.append('address', this.houseForm.get('address').value);
    house.append('numberOfBedroom', this.houseForm.get('numberOfBedroom').value);
    house.append('numberOfBathroom', this.houseForm.get('numberOfBathroom').value);
    house.append('description', this.houseForm.get('description').value);
    house.append('price', this.houseForm.get('price').value);
    house.append('image', this.selectedFile);
    this.houseService.update(id, house).subscribe(() => {
      this.router.navigateByUrl('/houses');
    });
  }

  getAllRoom() {
    this.roomsService.getAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  get nameControl() {
    return this.houseForm.get('name');
  }

  get idControl() {
    return this.houseForm.get('id');
  }

}
