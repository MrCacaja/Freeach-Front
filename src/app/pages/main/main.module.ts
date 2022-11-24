import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardPage} from "./dashboard/dashboard.page";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
];

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ]
})
export class MainModule { }
