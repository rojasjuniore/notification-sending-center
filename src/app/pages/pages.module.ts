import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from "./pages-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { LastNotificationsSentComponent } from './last-notifications-sent/last-notifications-sent.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ViewNotificationsComponent } from './view-notifications/view-notifications.component';
import { DataTableModule } from 'angular-6-datatable';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [CreateNotificationComponent, LastNotificationsSentComponent, ViewNotificationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SweetAlert2Module,
    DataTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class PagesModule { }
