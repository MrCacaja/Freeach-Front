import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static authToken: string = '';

  constructor(private httpSrvc: HttpService, private storage: StorageService) {
    if (!this.authToken) {
      const authToken = this.storage.get('authToken');
      if (typeof authToken === 'string') {
        //TODO: validar token
        AuthService.authToken = this.storage.get('authToken');
      }
    }
  }

  async login(email: string, password: string) {
    const authData = await this.httpSrvc.post('login', {email, senha: password});
    if (authData.error) {
      throw authData.error;
    } else {
      AuthService.authToken = authData.access_token;
      this.storage.set('authToken', this.authToken);
      return this.authToken;
    }
  }

  logout() {
    AuthService.authToken = '';
    this.storage.set('authToken', '');
  }

  async register(email: string, senha: string, nome: string) {
    const authData = await this.httpSrvc.post('signup', {email, senha, nome});
    if (authData.error) {
      throw authData.error;
    } else {
      AuthService.authToken = authData.access_token;
      this.storage.set('authToken', this.authToken);
      return this.authToken;
    }
  }

  get authToken() {
    return AuthService.authToken;
  }

  get defaultAuthHeader() {
    return {'Authorization': 'Bearer ' + this.authToken}
  }
}
