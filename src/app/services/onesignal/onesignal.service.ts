import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const url_root: any = "http://localhost:3000"
// const url_root: any = 'http://notificaciones.charlieburgerfood.com:3000'
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private http: HttpClient) { }

  createNotification(notification) {
    return this.http.post<any>(`${environment.url_root}/createNotification`, notification)
  }


  getViewNotifications() {
    return this.http.get(`${environment.url_root}/viewNotifications`)
  }

  getviewDevices() {
    return this.http.get(`${environment.url_root}/viewDevices`)
  }

  getformleaders() {
    return this.http.get(` https://app.charlieburgerfood.com/api/formleaders`)
  }

}
