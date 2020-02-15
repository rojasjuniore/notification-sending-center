import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url_root: any = "http://localhost:3000"
// const url_root: any = 'http://notificaciones.charlieburgerfood.com:3000'

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private http: HttpClient) { }

  createNotification(notification) {
    return this.http.post<any>(`${url_root}/createNotification`, notification)
  }


  getViewNotifications() {
    return this.http.get(`${url_root}/viewNotifications`)
  }

  getviewDevices() {
    return this.http.get(`${url_root}/viewDevices`)
  }

}
