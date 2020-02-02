// https://jasonwatmore.com/post/2019/06/14/angular-8-reactive-forms-validation-example
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from "../../helpers/urlvalidator.validator";

import { OnesignalService } from '../../services/onesignal/onesignal.service';


@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public _onesignal: OnesignalService) {
    this.registerForm = this.formBuilder.group({
      segments: ['', Validators.required],
      contents_es: ['', Validators.required],
      headings_es: ['', Validators.required],
      subtitle_es: ['', Validators.required],
      url_data: ['', [Validators.required]],
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

    console.log("value", this.registerForm.value)
    const value = this.registerForm.value
    const notification = {
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
      data: { url: value.url_data },
    };

    console.log('notification', notification)
    this._onesignal.createNotification(notification)
      .subscribe((data: any) => {
        console.log("data", data)
      }, err => { console.log(err) })
  }

  get url_data() {
    return this.registerForm.get('url_data');
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
