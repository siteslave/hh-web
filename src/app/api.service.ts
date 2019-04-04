import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any;
  httpOptions: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    var _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IlNBVElUIFJJQU5QSVQiLCJ1c2VybmFtZSI6InNhdGl0IiwiaWQiOjEsImlhdCI6MTU1NDI3NjIxMSwiZXhwIjoxNTg1ODMzODExfQ.790_ztW39uWSMsDn-uPEOtETPe7iBueP780YhBCPJPA';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + _token
      })
    };
  }

  async getRequsts() {
    const _url = `${this.apiUrl}/request`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async updateStatus(registerId: any, requestId: any, status: any) {
    const _url = `${this.apiUrl}/request/status/${registerId}/${requestId}`;
    const body: any = {
      status: status
    };
    return this.httpClient.put(_url, body, this.httpOptions).toPromise();
  }

}
