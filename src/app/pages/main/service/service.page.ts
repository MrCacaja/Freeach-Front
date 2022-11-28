import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {Servico} from "../../../interfaces/servico";
import {ActivatedRoute} from "@angular/router";
import {NavController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  public servico: Servico | undefined;

  constructor(
    private navCtrl: NavController,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async (params: any) => {
      try {
        this.servico = await this.httpService.get('servico/' + params.id);
      } catch (e) {
        const toast = await this.toastCtrl.create({
          message: 'Serviço não encontrado',
          color: 'danger',
          duration: 3000,
        })
        await toast.present();
        await this.navCtrl.navigateBack('main');
      }
    });
  }

}
