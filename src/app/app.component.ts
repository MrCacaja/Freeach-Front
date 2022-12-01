import {Component, OnInit} from '@angular/core';
import {MenuController, Platform} from "@ionic/angular";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "./services/auth.service";
import {Usuario} from "./interfaces/usuario";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public desktop = true;
  public openMenu = true;
  public enabledMenu = true;
  public pages: { icon: string, name: string, route: string }[] = [
    {
      icon: 'home',
      name: 'Home',
      route: 'main/dashboard'
    },
    {
      icon: 'people',
      name: 'Contatos',
      route: 'main/contacts'
    }
  ];
  public usuario: Usuario | undefined;

  constructor(
    public menuCtrl: MenuController,
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,
    private authSrvc: AuthService
  ) {
  }

  async ngOnInit() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((data) => {
      this.enabledMenu = !!this.route.root.firstChild?.snapshot.data['menu'];
    });
    this.desktop = this.platform.is('desktop');
    this.openMenu = this.desktop;
    this.authSrvc.getUserData$().subscribe(async (user) => {
      if (!user) return;
      this.usuario = user;
    });
  }

  async toggleMenu(open: boolean) {
    this.openMenu = open;
    if (!this.desktop) {
      open ? await this.menuCtrl.open('main') : await this.menuCtrl.close('main');
    }
  }
}
