import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {RegisterroleComponent} from './auth/registerrole/registerrole.component';
import {RegisterhostComponent} from './auth/registerhost/registerhost.component';
import {HostComponent} from './host/host.component';
import {LoadPageComponent} from './auth/load-page/load-page.component';
import {HouseListComponent} from './host/house/house-list/house-list.component';
import {HouseDetailComponent} from './host/house/house-detail/house-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'registerrole',
    component: RegisterroleComponent
  },
  {
    path: 'registerhost',
    component: RegisterhostComponent
  },
  {
    path: 'host',
    component: HostComponent
  },
  {
    path: 'loadPage',
    component: LoadPageComponent
  },
  {
    path: 'houses',
    component: HouseListComponent
  },
  {
    path: 'detail:/id',
    component: HouseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
