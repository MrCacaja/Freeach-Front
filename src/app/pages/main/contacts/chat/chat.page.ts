import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Chat} from "../../../../interfaces/chat";
import {HttpService} from "../../../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {Usuario} from "../../../../interfaces/usuario";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public messageForm: FormControl;
  public chat: Chat | undefined;
  public usuario: Usuario | undefined;
  @ViewChild('content') content: any;

  constructor(
    private fb: FormBuilder,
    private httpSrvc: HttpService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authSrvc: AuthService
  ) {
    this.messageForm = this.fb.control('', [Validators.required])
  }

  ngOnInit() {
    this.route.params.subscribe(async (params: any) => {
      if (!params.id) {
        await this.navCtrl.back();
      }
      this.authSrvc.getUserData$().subscribe((user) => {
        this.usuario = user as any;
      });
      setInterval(async () => {
        const newChat = await this.httpSrvc.get('chat/' + params.id);
        const hasNewMessages = this.chat?.mensagens?.length !== newChat?.mensagens?.length
        if (hasNewMessages) {
          this.chat = newChat;
          setTimeout(() => {
            this.content.scrollToBottom(10);
          }, 100);
        }
      }, 1000);
    });
  }

  async sendMessage() {
    if (this.messageForm.invalid || !this.messageForm.value.trim()) return;
    await this.httpSrvc.post('mensagem', {
      id_autor: (this.usuario as any).id,
      conteudo: this.messageForm.value.trim(),
      id_chat: (this.chat as any).id,
    })
    this.messageForm.setValue('');
  }

}
