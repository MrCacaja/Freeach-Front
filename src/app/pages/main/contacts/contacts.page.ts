import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../interfaces/usuario";
import {HttpService} from "../../../services/http.service";
import {AuthService} from "../../../services/auth.service";
import {Chat} from "../../../interfaces/chat";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  public contatos: Chat[] = [];

  constructor(private httpSrvc: HttpService, private authSrvc: AuthService) { }

  async ngOnInit() {
    this.authSrvc.getUserData$().subscribe(async (user) => {
      if (!user) return;
      this.contatos = await this.httpSrvc.get(`chat/usuario/${user?.id}`, this.authSrvc.defaultAuthHeader);
      this.contatos.forEach((contato) => {
        (contato as any).titulo = contato.participantes.map(p => p.nome).join(', ');
      })
    });
  }

}
