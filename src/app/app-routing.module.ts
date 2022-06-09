import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {RegisterroleComponent} from './auth/registerrole/registerrole.component';
import {RegisterhostComponent} from './auth/registerhost/registerhost.component';
import {HostComponent} from './host/host.component';


const routes: Routes = [
  {
    path: 'login',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
