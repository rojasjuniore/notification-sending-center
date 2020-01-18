import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  myForm
  constructor(private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      email: '',
      password: '',
      rememberMe: ''
    });
  }

  ngOnInit() {
  }

  update() {
    this.router.navigate(['/pages/create-notification']);
  }

}
