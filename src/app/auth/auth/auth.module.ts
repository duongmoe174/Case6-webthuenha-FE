import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {RegisterroleComponent} from '../registerrole/registerrole.component';
import {RegisterhostComponent} from '../registerhost/registerhost.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterroleComponent,
    RegisterhostComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
