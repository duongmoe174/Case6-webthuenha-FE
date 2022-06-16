import {Component, OnInit} from '@angular/core';
import {House} from '../../../model/house';
import {Room} from '../../../model/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../service/house/house.service';
import {RoomService} from '../../../service/room/room.service';
import {Router} from '@angular/router';
import {Status} from '../../../model/status';
import {StatusService} from '../../../service/status/status.service';
import {User} from '../../../model/user';
import {ProfileService} from '../../../service/profile/profile.service';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {
  host: any = {};
  currentUser: any = {};
  selectedFile = null;
  house: House = {};
  user: User = {};
  rooms: Room[] = [];
  statuses: Status[] = [];
  houseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    room_category: new FormControl(),
    address: new FormControl('', [Validators.required]),
    numberOfBedroom: new FormControl(),
    numberOfBathroom: new FormControl(),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl(),
    status: new FormControl(),
  });
  constructor(private houseService: HouseService,
              private roomService: RoomService,
              private statusService: StatusService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getAllRoom();
    this.getAllStatus();
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  getAllRoom() {
    this.roomService.getAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  getAllStatus() {
    this.statusService.getAll().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

  get idControl() {
    return this.houseForm.get('id');
  }

  get nameControl() {
    return this.houseForm.get('name');
  }

  get addressControl() {
    return this.houseForm.get('address');
  }

  get descriptionControl() {
    return this.houseForm.get('description');
  }

  get priceControl() {
    return this.houseForm.get('price');
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
    data.append('status', this.houseForm.get('status').value);
    data.append('host', this.host.id);
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
  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.getHostByAppUserId(this.currentUser.id);
  }
  getHostByAppUserId(id) {
    this.profileService.getHostByAppUserId(id).subscribe(newHost => {
      this.host = newHost;
    });
  }
}
