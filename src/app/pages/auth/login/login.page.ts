import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NavController, Platform, ToastController} from "@ionic/angular";
import {ExceptionService} from "../../../services/exception.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../auth.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;
  public mobile = false;

  constructor(
    private fb: FormBuilder,
    private authSrvc: AuthService,
    private platform: Platform,
    public exceptionSrvc: ExceptionService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    this.mobile = this.platform.is('mobile');
    await this.authSrvc.logout();
  }

  async login() {
    if (this.form.invalid) return;
    const {email, password} = this.form.value;
    try {
      await this.authSrvc.login(email, password);
      await this.navCtrl.navigateRoot('main');
    } catch (e) {
      console.error(e);
      const toast = await this.toastCtrl.create({
        message: this.exceptionSrvc.exceptionErrorMessage(e),
        color: 'danger',
        duration: 3000,
      })
      await toast.present();
    }
  }

  async notImplemented() {
    const toast = await this.toastCtrl.create({
      message: 'Não implementado',
      color: 'medium',
      duration: 3000,
    })
    await toast.present();
  }
}
