import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  http = inject(HttpClient)
  apiUrl = environment.base_url
  constructor() { }

  uploadImage(imageObj : any) {
    return this.http.post(`${this.apiUrl}uploadImage`, imageObj)
  }

  register(registerData : any) {
    return this.http.post(`${this.apiUrl}register`, registerData)
  }
}
