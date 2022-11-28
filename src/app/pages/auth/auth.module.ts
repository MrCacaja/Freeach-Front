import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPage} from "./login/login.page";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterPage} from "./register/register.page";

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  declarations: [LoginPage, RegisterPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
