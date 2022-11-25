import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2pkbkBmcmVlYWNoLmNvbSIsImV4cGlyZXMiOjE2NjkzNDE4NDYuNTQ4Njc3fQ.n0RD0FdrBK-Q4Dl7zVCCWnWUmqvSbOBzTLeuCX9A9R0';
  private headers = {
    'Authorization': 'Bearer ' + this.authToken,
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }

  constructor(private http: HttpClient) {
  }

  async post(url: string, body: any) {
    this.headers.Authorization = 'Bearer ' + this.authToken
    return await this.http.post(environment.backendUrl + url, body, {headers: this.headers}).toPromise();
  }

  async put(url: string, body: any) {
    this.headers.Authorization = 'Bearer ' + this.authToken
    return await this.http.put(environment.backendUrl + url, body, {headers: this.headers}).toPromise();
  }

  async delete(url: string) {
    this.headers.Authorization = 'Bearer ' + this.authToken
    return await this.http.delete(environment.backendUrl + url, {headers: this.headers}).toPromise();
  }

  async get(url: string) {
    this.headers.Authorization = 'Bearer ' + this.authToken
    return await this.http.get(environment.backendUrl + url, {headers: this.headers}).toPromise();
  }
}
