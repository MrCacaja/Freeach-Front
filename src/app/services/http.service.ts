import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers = {
    'Authorization': '',
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }

  constructor(private http: HttpClient) {
  }

  async post(url: string, body: any, headers = {}): Promise<any> {
    headers = {...this.headers, ...headers};
    return await this.http.post(environment.backendUrl + url, body, {headers}).toPromise();
  }

  async put(url: string, body: any, headers = {}): Promise<any> {
    headers = {...this.headers, ...headers};
    return await this.http.put(environment.backendUrl + url, body, {headers}).toPromise();
  }

  async delete(url: string, headers = {}): Promise<any> {
    headers = {...this.headers, ...headers};
    return await this.http.delete(environment.backendUrl + url, {headers}).toPromise();
  }

  async get(url: string, headers = {}): Promise<any> {
    headers = {...this.headers, ...headers};
    const data: any = await this.http.get(environment.backendUrl + url, {headers}).toPromise();
    if (data.limit > -1 && data.offset > -1) {
      return data.data;
    }
    return data;
  }
}
