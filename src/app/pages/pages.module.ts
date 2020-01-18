import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from "./pages-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { LastNotificationsSentComponent } from './last-notifications-sent/last-notifications-sent.component';


@NgModule({
  declarations: [CreateNotificationComponent, LastNotificationsSentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
