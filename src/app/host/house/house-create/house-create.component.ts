import {Component, OnInit} from '@angular/core';
import {House} from '../../../model/house';
import {Room} from '../../../model/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../service/house/house.service';
import {RoomService} from '../../../service/room/room.service';
import {Router} from '@angular/router';
import {Host} from '../../../model/host';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {
  selectedFile = null;
  house: House = {};
  rooms: Room[] = [];
  houseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    room_category: new FormControl(),
    address: new FormControl(),
    numberOfBedroom: new FormControl(),
    numberOfBathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
  });
  constructor(private houseService: HouseService,
              private roomService: RoomService,
              private router: Router) { }

  ngOnInit() {
    this.getAllRoom();
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  getAllRoom() {
    this.roomService.getAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  get idControl() {
    return this.houseForm.get('id');
  }

  get nameControl() {
    return this.houseForm.get('name');
  }

  create() {
    const data: FormData = new FormData();
    data.append('name', this.houseForm.get('name').value);
    data.append('room_category', this.houseForm.get('room_category').value);
    data.append('address', this.houseForm.get('address').value);
    data.append('numberOfBedroom', this.houseForm.get('numberOfBedroom').value);
    data.append('numberOfBathroom', this.houseForm.get('numberOfBathroom').value);
    data.append('description', this.houseForm.get('description').value);
    data.append('price', this.houseForm.get('price').value);
    data.append('image', this.selectedFile);
    if (this.houseForm.invalid) {
      return;
    } else {
      const house = data;
      this.houseService.create(house).subscribe(() => {
        this.router.navigateByUrl('/houses');
      });
      this.houseForm.reset();
    }
  }

}
