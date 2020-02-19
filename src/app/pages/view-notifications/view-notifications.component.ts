import { Component, OnInit } from '@angular/core';
import { OnesignalService } from "../../services/onesignal/onesignal.service";

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.css']
})
export class ViewNotificationsComponent implements OnInit {
  data: any[]
  constructor(public _onesignal: OnesignalService) { }

  ngOnInit() {
    this._onesignal.getViewNotifications()
      .subscribe((data: any) => {
        console.log('data', data)
        this.transform(data.response.notifications)
      }, err => console.log(err))
  }

  transform(data) {
    if (!data) return
    let result = []
    data.forEach(item => {
      console.log("item.data", item.data)
      result.push({
        data: item.data ? item.data : "N/A",
        headings: item.headings.es ? item.headings.es : "N/A",
        contents: item.contents.es ? item.contents.es : "N/A",
        included_segments: item.included_segments[0] ? item.included_segments[0] : "N/A",
        completed_at: item.completed_at ? item.completed_at : "N/A",
        successful: item.successful ? item.successful : "N/A",
        received: item.received ? item.received : "N/A",
        ios: item.platform_delivery_stats.ios ? item.platform_delivery_stats.ios : { successful: 0, errored: 0, failed: 0 },
        android: item.platform_delivery_stats.android ? item.platform_delivery_stats.android : { successful: 0, errored: 0, failed: 0 },
        chrome_web_push: item.platform_delivery_stats.chrome_web_push ? item.platform_delivery_stats.chrome_web_push : { successful: 0, errored: 0, failed: 0 }
      })
    });
    this.data = result
  }
}
