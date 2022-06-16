import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationDetailService} from '../../service/notification-detail/notification-detail.service';
import {InformationSaveService} from '../../service/information-save/information-save.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {
  currentUser: any = {};
  listInformationIsActive: any[] = [];

  lisInformationSaveActive: any[] = [];


  constructor(private authService: AuthService,
              private router: Router,
              private notificationDetailService: NotificationDetailService,
              private informationSaveService: InformationSaveService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.get10InformationSaveByIdUserActive();
    this.getAllInformationSaveByIdUserIsActive();
  }


  get10InformationSaveByIdUserActive() {
    this.informationSaveService.get10InformationSaveByIdUserActive(this.currentUser.id).subscribe((listBE) => {
      this.lisInformationSaveActive = listBE;
    });
  }

  getAllInformationSaveByIdUserIsActive() {
    this.informationSaveService.getAllInformationSaveByIdUserIsActive(this.currentUser.id).subscribe((listBE) => {
      this.listInformationIsActive = listBE;
    });
  }

  changeActiveInformation(id) {
    this.informationSaveService.changeActiveInformation(id).subscribe(() => {
      this.get10InformationSaveByIdUserActive();
      this.getAllInformationSaveByIdUserIsActive();
    });
  }
}
