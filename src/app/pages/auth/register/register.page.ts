import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NavController, Platform, ToastController} from "@ionic/angular";
import {ExceptionService} from "../../../services/exception.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../auth.scss'],
})
export class RegisterPage implements OnInit {
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
      name: ['', [Validators.required, Validators.minLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: [this.checkPasswords]});
  }

  ngOnInit() {
    this.mobile = this.platform.is('mobile');
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    return group.get('password2')?.value === group.get('password')?.value ? null : {notSame: true};
  }

  async register() {
    if (this.form.invalid) return;
    const {email, password, name} = this.form.value;
    try {
      await this.authSrvc.register(email, password, name);
      await this.navCtrl.navigateRoot('main');
      const toast = await this.toastCtrl.create({
        message: 'Cadastro realizado com sucesso',
        color: 'success',
        duration: 3000,
      })
      await toast.present();
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
}
