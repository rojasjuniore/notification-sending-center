import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { SignInComponent } from "./sign-in/sign-in.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from "./public-routing.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
