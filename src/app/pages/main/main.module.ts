import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPage} from "./dashboard/dashboard.page";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ServicePage} from "./service/service.page";
import {ContactsPage} from "./contacts/contacts.page";
import {ChatPage} from "./contacts/chat/chat.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'service/:id',
    component: ServicePage
  },
  {
    path: 'contacts',
    component: ContactsPage
  },
  {
    path: 'contacts/:id',
    component: ChatPage
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [DashboardPage, ServicePage, ContactsPage, ChatPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule {
}
