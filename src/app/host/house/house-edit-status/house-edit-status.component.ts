import { Component, OnInit } from '@angular/core';
import {House} from '../../../model/house';
import {Status} from '../../../model/status';
import {FormControl, FormGroup} from '@angular/forms';
import {HouseService} from '../../../service/house/house.service';
import {StatusService} from '../../../service/status/status.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../model/room';
import {RoomService} from '../../../service/room/room.service';

@Component({
  selector: 'app-house-edit-status',
  templateUrl: './house-edit-status.component.html',
  styleUrls: ['./house-edit-status.component.css']
})
export class HouseEditStatusComponent implements OnInit {
  selectedFile = new File(['none'], 'filename.jpg');
  houseForm: FormGroup = new FormGroup({
    status: new FormControl()
  });
  id: number;
  rooms: Room[] = [];
  statuses: Status[] = [];
  constructor(private houseService: HouseService,
              private roomsService: RoomService,
              private statusService: StatusService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      this.id = + paramMap.get('id');
      this.getHouseById(this.id);
    });
  }

  ngOnInit() {
    this.getAllStatus();
  }

  getHouseById(id: number) {
    return this.houseService.findById(id).subscribe((house) => {
      this.houseForm = new FormGroup({
        status: new FormControl(house.status.name)
      });
    });
  }

  updateHouseStatus(id: number) {
    const house: FormData = new FormData();
    house.append('status', this.houseForm.get('status').value);
    this.statusService.update(id, house).subscribe(() => {
      this.router.navigateByUrl('/houses');
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


}
