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
import {HouseCreateComponent} from './host/house/house-create/house-create.component';
import {HouseEditComponent} from './host/house/house-edit/house-edit.component';
import {HouseDeleteComponent} from './host/house/house-delete/house-delete.component';
import {ProfileUserComponent} from './user/profile-user/profile-user.component';
import {ProfileHostComponent} from './host/profile-host/profile-host.component';
import {ChangePasswordUserComponent} from './user/change-password-user/change-password-user.component';
import {Error403Component} from './error403/error403/error403.component';
import {HouseEditStatusComponent} from './host/house/house-edit-status/house-edit-status.component';
import {ViewHouseComponent} from './user/view-house/view-house.component';
import {OrderDetailComponent} from './user/order-detail/order-detail.component';
import {NotificationDetailComponent} from './host/notification-detail/notification-detail.component';
import {OrderComponent} from './host/order/order.component';


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
    path: 'detail/:id',
    component: HouseDetailComponent
  },
  {
    path: 'create',
    component: HouseCreateComponent
  },
  {
    path: 'edit/:id',
    component: HouseEditComponent
  },
  {
    path: 'delete/:id',
    component: HouseDeleteComponent
  },
  {
    path: 'status/:id',
    component: HouseEditStatusComponent
  },
  {
    path: 'profileGuest',
    component: ProfileUserComponent
  },
  {
    path: 'profileHost',
    component: ProfileHostComponent
  },
  {
    path: 'changePassUser',
    component: ChangePasswordUserComponent
  },
  {
    path: '403',
    component: Error403Component
  },
  {
    path: 'view/:id',
    component: ViewHouseComponent
  },
  {
    path: 'orderDetail',
    component: OrderDetailComponent
  },
  {
    path: 'notification',
    component: NotificationDetailComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
