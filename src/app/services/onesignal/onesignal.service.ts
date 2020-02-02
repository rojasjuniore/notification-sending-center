import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const url_root: any = "http://localhost:3000"
const url_root: any = 'https://notificaciones.charlieburgerfood.com:3000'

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private http: HttpClient) { }

  createNotification(notification) {
    return this.http.post<any>(`${url_root}/createNotification`, notification)
  }


  getviewDevices() {
    return this.http.get(`${url_root}/viewDevices`)
  }

}
