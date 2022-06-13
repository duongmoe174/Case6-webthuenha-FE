import { Component, OnInit } from '@angular/core';
import {House} from '../../../model/house';
import {Status} from '../../../model/status';
import {FormControl, FormGroup} from '@angular/forms';
import {HouseService} from '../../../service/house/house.service';
import {StatusService} from '../../../service/status/status.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-house-edit-status',
  templateUrl: './house-edit-status.component.html',
  styleUrls: ['./house-edit-status.component.css']
})
export class HouseEditStatusComponent implements OnInit {
  selectedFile = new File(['none'], 'filename.jpg');
  house: House = {};
  id: number;
  statuses: Status[] = [];
  houseForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    image: new FormControl(),
    status: new FormControl(),
  });
  image = null;
  constructor(private houseService: HouseService,
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
        image: new FormControl(),
        status: new FormControl(house.status.name),
      });
    });
  }

  updateHouseStatus(id: number) {
    const house: FormData = new FormData();
    house.append('id', this.houseForm.get('id').value);
    house.append('name', this.houseForm.get('name').value);
    house.append('image', this.selectedFile);
    house.append('status', this.houseForm.get('status').value);
    this.houseService.update(id, house).subscribe(() => {
      this.router.navigateByUrl('/houses');
    });
  }

  getAllStatus() {
    this.statusService.getAll().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

  get nameControl() {
    return this.houseForm.get('name');
  }

  get idControl() {
    return this.houseForm.get('id');
  }

}
