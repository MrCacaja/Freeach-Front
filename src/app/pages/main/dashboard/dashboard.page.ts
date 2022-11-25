import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private httpSrvc: HttpService) { }

  async ngOnInit() {
    console.log(await this.httpSrvc.get('usuarios'))
  }

}
