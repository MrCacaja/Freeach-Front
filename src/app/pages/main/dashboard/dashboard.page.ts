import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {AuthService} from "../../../services/auth.service";
import {Servico} from "../../../interfaces/servico";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public servicos: Servico[] = [];
  public slidesOptions = {
    slidesPerView: 3,
    spaceBetween: 12,
  };
  public mobile = false;

  constructor(private httpSrvc: HttpService, private authSrvc: AuthService, private platform: Platform) {
  }

  async ngOnInit() {
    this.mobile = this.platform.is('mobile');
    this.servicos = await this.httpSrvc.get('servico', this.authSrvc.defaultAuthHeader);
    this.slidesOptions.slidesPerView = this.mobile ? 2 : 3;
  }
}
