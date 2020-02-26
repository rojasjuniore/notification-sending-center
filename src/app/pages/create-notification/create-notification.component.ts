// https://jasonwatmore.com/post/2019/06/14/angular-8-reactive-forms-validation-example
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from "../../helpers/urlvalidator.validator";
import { removeSpaces } from "../../helpers/removeSpaces";
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
  formleaders: any
  constructor(
    private formBuilder: FormBuilder,
    public _onesignal: OnesignalService) {

    this.getformleaders()
    this.loading = false
    this.registerForm = this.formBuilder.group({
      segments: ['', Validators.required],
      contents_es: ['', Validators.required],
      headings_es: ['', Validators.required],
      subtitle_es: ['', Validators.required],
      acceptTerms: [false, Validators.required],
      isChecked: [false],
      promotion: [false],
      url_data: ['https://app.charlieburgerfood.com/'],
      date: [null],
    });
  }


  getformleaders() {
    this._onesignal
      .getformleaders()
      .subscribe((data) => {
        this.formleaders = data
        console.log('data', data)
      }, err => console.log(err))
  }


  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    const value = this.registerForm.value
    console.log('this.registerForm', this.registerForm)
    console.log('value', value)
    if (this.registerForm.invalid) {
      return;
    }



    const url_data = value.url_data ? value.url_data.trim() : 'https://app.charlieburgerfood.com/'

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
        include_player_ids: ["a4397f38-09b2-41fd-9315-03e90d9b7d9a", "92288eb1-d002-4fcd-b04d-4ef5e5c84ca1"],
        data: { url: url_data },
      };
    } else if (value.isChecked) {
      // Con fecha
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
        data: { url: url_data },
      }
    } else {
      // Sin fecha
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
        data: { url: url_data }
      }
    }

    console.log('notification', notification)
    return
    this.loading = true
    this._onesignal.createNotification(notification)
      .subscribe((data: any) => {
        let r = {
          id: data.response.body.id,
          recipients: data.response.body.recipients,
          date: data.response.headers.date,
          send_after: value.isChecked ? moment(value.date).format() : data.response.headers.date
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
