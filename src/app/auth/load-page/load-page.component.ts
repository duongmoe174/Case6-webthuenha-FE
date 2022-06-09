import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.css']
})
export class LoadPageComponent implements OnInit {
currentUser: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }
  loadPage() {
    const roleList = this.currentUser.roles;
    for (const role of roleList) {
      if (role.authority === 'ROLE_USER') {
        this.router.navigateByUrl('/user');
      }
      if (role.authority === 'ROLE_ADMIN') {
        this.router.navigateByUrl('/admin');
      }
      if (role.authority === 'ROLE_HOST') {
        this.router.navigateByUrl('/host');
      }
    }
  }
}
