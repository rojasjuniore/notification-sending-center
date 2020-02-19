// https://jasonwatmore.com/post/2019/06/14/angular-8-reactive-forms-validation-example
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from "../../helpers/urlvalidator.validator";
import { OnesignalService } from '../../services/onesignal/onesignal.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import * as moment from 'moment';


@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent {
  registerForm: FormGroup;
  submitted = false;

  @ViewChild('notificationNotSentSwal', { static: false }) private notificationNotSentSwal: SwalComponent;
  @ViewChild('notificationSentSwal', { static: false }) private notificationSentSwal: SwalComponent;
  info: any
  loading: boolean
  // Min moment: February 12 2018, 10:30
  public min = new Date(2020, 1, 12, 10, 30);

  // Max moment: April 21 2018, 20:30
  public max = new Date(2021, 3, 21, 20, 30);

  constructor(private formBuilder: FormBuilder, public _onesignal: OnesignalService) {
    this.loading = false
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.registerForm = this.formBuilder.group({
      segments: ['', Validators.required],
      contents_es: ['', Validators.required],
      headings_es: ['', Validators.required],
      subtitle_es: ['', Validators.required],
      url_data: ['', [Validators.required, Validators.pattern(reg)]],
      date: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
    });
  }


  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // console.log("value", this.registerForm.value)
    // console.log("MI TOKEN IPHONE 7 PLUS: 1ee4b59f-d976-4a72-a30b-3d88ca3dfa33")
    // console.log("MI TOKEN IPAD: a131de03-d502-420d-bd6a-711ff77bc518")
    const value = this.registerForm.value
    // console.log('value', value)
    // console.log(value.date)
    // var newDate = moment(value.date).format();
    // console.log(newDate)
    let notification: any
    if (value.segments == 'test') {
      notification = {
        headings: {
          es: value.headings_es,
          en: value.headings_es,
        },
        subtitle: {
          es: value.subtitle_es,
          en: value.subtitle_es,
        },
        contents: {
          es: value.contents_es,
          en: value.contents_es,
        },
        include_player_ids: ["a131de03-d502-420d-bd6a-711ff77bc518", "1ee4b59f-d976-4a72-a30b-3d88ca3dfa33"],
        send_after: moment(value.date).format(),
        data: { url: value.url_data },
      };
    } else {
      notification = {
        headings: {
          es: value.headings_es,
          en: value.headings_es,
        },
        subtitle: {
          es: value.subtitle_es,
          en: value.subtitle_es,
        },
        contents: {
          es: value.contents_es,
          en: value.contents_es,
        },
        included_segments: [value.segments],
        send_after: moment(value.date).format(),
        data: { url: value.url_data },
      }
    }

    console.log('notification', notification)
    this.loading = true
    this._onesignal.createNotification(notification)
      .subscribe((data: any) => {
        let r = {
          id: data.response.body.id,
          recipients: data.response.body.recipients,
          date: data.response.headers.date,
          send_after: moment(value.date).format()
        }
        console.log("data", data)
        this.info = r
        console.log("data", r)
        setTimeout(() => {
          this.notificationSentSwal.fire()
          this.loading = false
        }, 1000);
      }, err => {
        console.log(err)
        this.loading = false
        this.notificationNotSentSwal.fire()
      })

  }

  get url_data() {
    return this.registerForm.get('url_data');
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    // this.registerForm.reset();
  }

}
