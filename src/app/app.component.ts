import {Component, OnInit} from '@angular/core';
import {AnimationController, MenuController, Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public desktop = true;
  public openMenu = true;
  public pages: {icon: string, name: string, route: string}[] = [
    {
      icon: 'home',
      name: 'Home',
      route: 'main'
    }
  ]

  constructor(public menuCtrl: MenuController, private platform: Platform, private animationCtrl: AnimationController) {}

  async ngOnInit() {
    this.desktop = this.platform.is('desktop');
    this.openMenu = this.desktop
  }

  async toggleMenu(open: boolean) {
    this.openMenu = open;
    if (!this.desktop) {
      open ? await this.menuCtrl.open('main') : await this.menuCtrl.close('main');
    }
  }
}
