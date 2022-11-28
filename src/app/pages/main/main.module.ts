import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardPage} from "./dashboard/dashboard.page";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ServicePage} from "./service/service.page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'service/:id',
    component: ServicePage
  }
];

@NgModule({
  declarations: [DashboardPage, ServicePage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ]
})
export class MainModule { }
